import type * as AgentMail from "../api/index.js";
import type { WebsocketsSocket } from "../api/resources/websockets/client/Socket.js";
import { ReconnectingWebSocket } from "../core/index.js";
import * as Events from "../core/websocket/events.js";

export interface ReconnectPolicy {
    baseDelayMs: number;
    maxDelayMs: number;
    /** How long a connection must stay open before the backoff starts over. */
    stableAfterMs: number;
}

export const DEFAULT_RECONNECT_POLICY: ReconnectPolicy = { baseDelayMs: 1000, maxDelayMs: 60000, stableAfterMs: 5000 };

/** Exponential backoff with full jitter: uniform in [0, min(maxDelayMs, baseDelayMs * 2^attempt)). */
export function backoffDelay(attempt: number, policy: ReconnectPolicy, random: () => number = Math.random): number {
    return random() * Math.min(policy.maxDelayMs, policy.baseDelayMs * 2 ** attempt);
}

export interface AutoReconnectOptions {
    /** The generated socket's own retry budget (`reconnectAttempts`). */
    maxRetries: number;
    abortSignal?: AbortSignal;
    policy: ReconnectPolicy;
}

const { OPEN, CLOSING, CLOSED } = ReconnectingWebSocket.ReadyState;

// ws reports a refused handshake as "Unexpected server response: <status>". Browsers expose no status,
// so there every refusal looks transient and is retried on the capped backoff.
const HANDSHAKE_STATUS = /^Unexpected server response: (\d{3})\b/;

// Refusals that retrying with the same credentials cannot fix. 402 comes from the x402/MPP proxies,
// whose payment credential is minted once per connect() call and reused on reconnects. The server
// also answers 403 when the organization is at its connection cap, which a retry could outlast.
const TERMINAL_FAILURES = new Map<string, string>([
    ["401", "WebSocket authentication failed (401): the API key is missing, invalid, or was deleted."],
    [
        "402",
        "WebSocket payment required (402): the payment credential minted by connect() is no longer accepted; open a new socket with client.websockets.connect() to pay again.",
    ],
    [
        "403",
        "WebSocket authentication failed (403): the API key is invalid or was deleted, or the organization is at its WebSocket connection limit.",
    ],
]);

/**
 * Keeps `socket` connected and subscribed: re-sends every subscription on each reconnect, takes over
 * reconnecting whenever the generated socket gives up, and stops on close(), abort, or a terminal
 * handshake refusal.
 */
export function enableAutoReconnect(socket: WebsocketsSocket, options: AutoReconnectOptions): void {
    const { maxRetries, abortSignal, policy } = options;
    const rws = socket.socket;
    const sendSubscribe = socket.sendSubscribe.bind(socket);
    const closeSocket = rws.close.bind(rws);
    const reconnectSocket = rws.reconnect.bind(rws);

    // Keyed by canonical JSON. Re-sending a message moves it to the end, so a replay applies
    // subscriptions in the order they were last sent (the server keeps the last event_types per id).
    const subscriptions = new Map<string, AgentMail.Subscribe>();
    // Keys already sent on the current connection, e.g. by the user's own open handler.
    const sentOnConnection = new Set<string>();

    let opened = rws.readyState === OPEN;
    let openedAt = opened ? Date.now() : undefined;
    let stopped = false;
    let attempt = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let emitting = false;

    const isStopped = (): boolean => stopped || abortSignal?.aborted === true;

    const cancelTimer = (): void => {
        clearTimeout(timer);
        timer = undefined;
    };

    const stop = (): void => {
        stopped = true;
        cancelTimer();
    };

    const emitError = (message: string): void => {
        const event = new Events.ErrorEvent(new Error(message), rws);
        emitting = true;
        try {
            rws.onerror?.(event);
            rws.dispatchEvent(event);
        } finally {
            emitting = false;
        }
    };

    const scheduleReconnect = (): void => {
        cancelTimer();
        timer = setTimeout(
            () => {
                timer = undefined;
                if (isStopped()) return;
                // reconnect() on a socket that is not CLOSED closes it with 1000 and then never connects.
                if (rws.readyState === CLOSED) reconnectSocket();
                else if (rws.readyState === CLOSING) scheduleReconnect();
            },
            backoffDelay(attempt++, policy),
        );
    };

    rws.addEventListener("open", () => {
        cancelTimer();
        openedAt = Date.now();
        if (!opened) {
            opened = true;
            return;
        }
        for (const [key, message] of subscriptions) {
            if (isStopped() || rws.readyState !== OPEN) return;
            if (sentOnConnection.has(key)) continue;
            try {
                sendSubscribe(message);
                sentOnConnection.add(key);
            } catch (error) {
                emitError(
                    `Failed to re-subscribe after reconnecting: ${error instanceof Error ? error.message : String(error)}`,
                );
            }
        }
    });

    rws.addEventListener("close", (event) => {
        sentOnConnection.clear();
        if (openedAt !== undefined && Date.now() - openedAt >= policy.stableAfterMs) attempt = 0;
        openedAt = undefined;
        if (isStopped()) return;
        if (event.code !== 1000) {
            // The generated socket retries these closes itself, up to maxRetries times.
            if (rws.retryCount < maxRetries) return;
            // It has just scheduled its last retry. If that one fails too, it keeps its connect lock
            // and ignores reconnect() for good, so cancel it and take over.
            closeSocket();
        }
        scheduleReconnect();
    });

    rws.addEventListener("error", (event) => {
        if (emitting || isStopped()) return;
        const status = HANDSHAKE_STATUS.exec(event.message)?.[1];
        const failure = status === undefined ? undefined : TERMINAL_FAILURES.get(status);
        if (failure === undefined) return;
        stop();
        emitError(`${failure} Not reconnecting.`);
    });

    abortSignal?.addEventListener("abort", stop, { once: true });

    // Patched on the generated socket so WebsocketsSocket.close()/connect() and direct
    // socket.socket.close()/reconnect() calls all count as the user's intent.
    rws.close = (code?: number, reason?: string): void => {
        stop();
        subscriptions.clear();
        closeSocket(code, reason);
    };

    rws.reconnect = (code?: number, reason?: string): void => {
        stopped = false;
        attempt = 0;
        cancelTimer();
        reconnectSocket(code, reason);
    };

    socket.sendSubscribe = (message: AgentMail.Subscribe): void => {
        sendSubscribe(message);
        const key = subscriptionKey(message);
        subscriptions.delete(key);
        subscriptions.set(key, JSON.parse(JSON.stringify(message)));
        sentOnConnection.add(key);
    };
}

// Canonical JSON (sorted object keys), so the same subscription written in a different key order dedupes.
function subscriptionKey(message: AgentMail.Subscribe): string {
    return JSON.stringify(message, (_key, value: unknown) => {
        if (value === null || typeof value !== "object" || Array.isArray(value)) return value;
        const sorted: Record<string, unknown> = {};
        for (const key of Object.keys(value).sort()) {
            sorted[key] = (value as Record<string, unknown>)[key];
        }
        return sorted;
    });
}
