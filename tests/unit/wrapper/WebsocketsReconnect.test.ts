import { createServer, type IncomingHttpHeaders, STATUS_CODES } from "node:http";
import type { AddressInfo } from "node:net";
import type { Duplex } from "node:stream";
import { type WebSocket as ServerSocket, WebSocketServer } from "ws";
import type * as AgentMail from "../../../src/api";
import { WebsocketsSocket } from "../../../src/api/resources/websockets/client/Socket";
import { ReconnectingWebSocket } from "../../../src/core/websocket/ws";
import { SDK_VERSION } from "../../../src/version";
import {
    backoffDelay,
    DEFAULT_RECONNECT_POLICY,
    enableAutoReconnect,
    type ReconnectPolicy,
} from "../../../src/wrapper/reconnect";
import { WebsocketsClient } from "../../../src/wrapper/WebsocketsClient";

// vi.hoisted runs before the imports above are evaluated. The generated socket draws its first retry
// delay (uniform 1-5 s) from Math.random once, at import; pin it to 1 s so the tests that go through
// its own retry are fast and deterministic.
const restoreRandom = vi.hoisted(() => {
    const random = Math.random;
    Math.random = () => 0;
    return () => {
        Math.random = random;
    };
});

beforeAll(() => restoreRandom());

const fastPolicy: ReconnectPolicy = { baseDelayMs: 5, maxDelayMs: 40, stableAfterMs: 5000 };

const inboxSubscription: AgentMail.Subscribe = { type: "subscribe", inboxIds: ["inbox_1"] };
const inboxWire = { type: "subscribe", inbox_ids: ["inbox_1"] };
const podSubscription: AgentMail.Subscribe = {
    type: "subscribe",
    podIds: ["pod_1"],
    eventTypes: ["message.received"],
};
const podWire = { type: "subscribe", pod_ids: ["pod_1"], event_types: ["message.received"] };

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** "accept" completes the upgrade, "hold" never answers it, a number refuses it with that HTTP status. */
type Handshake = "accept" | "hold" | number;

interface ServerConnection {
    socket: ServerSocket;
    received: unknown[];
}

const cleanups: Array<() => unknown> = [];

afterEach(async () => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    while (cleanups.length > 0) await cleanups.pop()?.();
});

async function startServer(onConnection?: (connection: ServerConnection, index: number) => void) {
    const handshakes: IncomingHttpHeaders[] = [];
    const connections: ServerConnection[] = [];
    const plan: Handshake[] = [];
    const held: Duplex[] = [];
    const wss = new WebSocketServer({ noServer: true });
    const http = createServer();

    http.on("upgrade", (req, socket, head) => {
        handshakes.push(req.headers);
        const next = plan.shift() ?? "accept";
        if (next === "hold") {
            held.push(socket);
            return;
        }
        if (next !== "accept") {
            socket.end(`HTTP/1.1 ${next} ${STATUS_CODES[next]}\r\nConnection: close\r\nContent-Length: 0\r\n\r\n`);
            return;
        }
        wss.handleUpgrade(req, socket, head, (ws) => {
            const connection: ServerConnection = { socket: ws, received: [] };
            ws.on("message", (data) => connection.received.push(JSON.parse(data.toString())));
            connections.push(connection);
            onConnection?.(connection, connections.length - 1);
        });
    });
    await new Promise<void>((resolve) => http.listen(0, "127.0.0.1", resolve));

    cleanups.push(async () => {
        for (const { socket } of connections) socket.terminate();
        for (const socket of held) socket.destroy();
        wss.close();
        http.closeAllConnections();
        await new Promise((resolve) => http.close(resolve));
    });

    return {
        url: `ws://127.0.0.1:${(http.address() as AddressInfo).port}`,
        handshakes,
        connections,
        /** Queue responses for the next handshakes; anything not queued is accepted. */
        respond: (...next: Handshake[]) => plan.push(...next),
    };
}

type TestServer = Awaited<ReturnType<typeof startServer>>;

async function connect(
    server: TestServer,
    args: Parameters<WebsocketsClient["connect"]>[0] = {},
    policy: ReconnectPolicy = fastPolicy,
) {
    const client = new WebsocketsClient({ apiKey: "am_test_key", baseUrl: server.url }, undefined, policy);
    const socket = await client.connect(args);
    cleanups.push(() => socket.close());
    return socket;
}

function recordEvents(socket: WebsocketsSocket) {
    const events = { opens: 0, closes: [] as number[], errors: [] as string[] };
    socket.on("open", () => events.opens++);
    socket.on("close", (event) => events.closes.push(event.code));
    socket.on("error", (error) => events.errors.push(error.message));
    return events;
}

describe("WebsocketsClient auto-reconnect", () => {
    describe("first connection", () => {
        it("connects once and sends the first subscribe exactly once", async () => {
            const server = await startServer();
            const socket = await connect(server);

            expect(socket.readyState).toBe(ReconnectingWebSocket.ReadyState.OPEN);
            socket.sendSubscribe(inboxSubscription);

            await vi.waitFor(() => expect(server.connections[0].received).toHaveLength(1));
            await sleep(100);
            expect(server.handshakes).toHaveLength(1);
            expect(server.connections).toHaveLength(1);
            expect(server.connections[0].received).toEqual([inboxWire]);
        });

        it("sends the API key and the SDK version headers on the handshake", async () => {
            const server = await startServer();
            await connect(server);

            expect(server.handshakes[0]).toMatchObject({
                authorization: "Bearer am_test_key",
                "x-fern-sdk-name": "agentmail",
                "x-fern-sdk-version": SDK_VERSION,
            });
        });

        it("lets caller headers override the SDK version header", async () => {
            const server = await startServer();
            await connect(server, { headers: { "X-Fern-SDK-Version": "custom" } });

            expect(server.handshakes[0]["x-fern-sdk-version"]).toBe("custom");
        });

        it.each([
            403, 429,
        ])("rejects like before when the first handshake gets %i, and never retries", async (status) => {
            const server = await startServer();
            server.respond(status);

            const error = await connect(server).catch((e: unknown) => e);

            expect((error as { message: string }).message).toBe(`Unexpected server response: ${status}`);
            await sleep(200);
            expect(server.handshakes).toHaveLength(1);
        });

        it("throws on subscribe before the socket is open, and never replays that subscribe", async () => {
            const server = await startServer();
            const socket = await connect(server, { waitForOpen: false });

            expect(() => socket.sendSubscribe(inboxSubscription)).toThrow("Socket is not open.");
            await socket.waitForOpen();
            server.connections[0].socket.close(1000);

            await vi.waitFor(() => expect(server.connections).toHaveLength(2));
            await sleep(100);
            expect(server.connections[0].received).toEqual([]);
            expect(server.connections[1].received).toEqual([]);
        });
    });

    describe("recovery", () => {
        it("re-subscribes after the server drops an established socket (1001) and the generated socket reconnects", async () => {
            const server = await startServer();
            const socket = await connect(server);
            const events = recordEvents(socket);

            socket.sendSubscribe(inboxSubscription);
            socket.sendSubscribe(podSubscription);
            // Same subscription, different key order: deduped, and moved to the end of the replay.
            socket.sendSubscribe({ inboxIds: ["inbox_1"], type: "subscribe" });
            await vi.waitFor(() => expect(server.connections[0].received).toHaveLength(3));

            server.connections[0].socket.close(1001, "Going away");

            await vi.waitFor(() => expect(server.connections[1]?.received).toHaveLength(2), { timeout: 8000 });
            await sleep(100);
            expect(server.connections[1].received).toEqual([podWire, inboxWire]);
            expect(server.handshakes).toHaveLength(2);
            expect(events).toEqual({ opens: 1, closes: [1001], errors: [] });
        }, 15000);

        it("reconnects and re-subscribes after a close the generated socket does not retry (1000)", async () => {
            const server = await startServer();
            const socket = await connect(server);
            socket.sendSubscribe(inboxSubscription);
            await vi.waitFor(() => expect(server.connections[0].received).toHaveLength(1));

            server.connections[0].socket.close(1000);

            await vi.waitFor(() => expect(server.connections[1]?.received).toEqual([inboxWire]));
            // A subscribe on the new connection is recorded too and replayed on the next one.
            socket.sendSubscribe(podSubscription);
            await vi.waitFor(() => expect(server.connections[1].received).toHaveLength(2));
            server.connections[1].socket.close(1000);

            await vi.waitFor(() => expect(server.connections[2]?.received).toEqual([inboxWire, podWire]));
        });

        it("keeps retrying through 429 and 500 handshakes, then reconnects and re-subscribes", async () => {
            const server = await startServer();
            const socket = await connect(server);
            const events = recordEvents(socket);
            socket.sendSubscribe(inboxSubscription);
            await vi.waitFor(() => expect(server.connections[0].received).toHaveLength(1));

            // The generated socket's own retry after the 1001 gets the first 429 and gives up; the
            // wrapper retries from there.
            server.respond(429, 500, 429);
            server.connections[0].socket.close(1001);

            await vi.waitFor(() => expect(server.connections[1]?.received).toEqual([inboxWire]), { timeout: 8000 });
            expect(server.handshakes).toHaveLength(5);
            expect(events.errors).toEqual([
                "Unexpected server response: 429",
                "Unexpected server response: 500",
                "Unexpected server response: 429",
            ]);
            expect(events.opens).toBe(1);
        }, 15000);

        it("recovers when the first handshake fails and the caller did not wait for open", async () => {
            const server = await startServer();
            server.respond(503);
            const socket = await connect(server, { waitForOpen: false });
            socket.on("open", () => socket.sendSubscribe(inboxSubscription));

            await vi.waitFor(() => expect(server.connections[0]?.received).toEqual([inboxWire]));
            expect(server.handshakes).toHaveLength(2);
        });

        it("keeps reconnecting after the generated socket's reconnectAttempts run out", async () => {
            // Connections 2 and 3 are accepted and immediately dropped with 1011. On its own, the
            // generated socket stops for good on the second such drop when reconnectAttempts is 1.
            const server = await startServer((connection, index) => {
                if (index === 1 || index === 2) connection.socket.close(1011);
            });
            const socket = await connect(server, { reconnectAttempts: 1 });
            socket.sendSubscribe(inboxSubscription);
            await vi.waitFor(() => expect(server.connections[0].received).toHaveLength(1));

            server.connections[0].socket.close(1011);

            await vi.waitFor(() => expect(server.connections[3]?.received).toEqual([inboxWire]), {
                timeout: 10000,
            });
            expect(socket.readyState).toBe(ReconnectingWebSocket.ReadyState.OPEN);
        }, 15000);

        it("does not duplicate a subscribe the caller already re-sends from its own open handler", async () => {
            const server = await startServer();
            const socket = await connect(server, { waitForOpen: false });
            socket.on("open", () => socket.sendSubscribe(inboxSubscription));
            await vi.waitFor(() => expect(server.connections[0]?.received).toHaveLength(1));

            server.connections[0].socket.close(1000);

            await vi.waitFor(() => expect(server.connections[1]?.received).toHaveLength(1));
            await sleep(100);
            expect(server.connections[1].received).toEqual([inboxWire]);
        });
    });

    describe("stopping", () => {
        it.each([
            [401, "WebSocket authentication failed (401): the API key is missing, invalid, or was deleted."],
            [402, "WebSocket payment required (402): "],
            [403, "WebSocket authentication failed (403): the API key is invalid or was deleted"],
        ])("stops and reports a clear error when a reconnect handshake gets %i", async (status, clearError) => {
            const server = await startServer();
            const socket = await connect(server);
            const events = recordEvents(socket);

            server.respond(status);
            server.connections[0].socket.close(1000);

            await vi.waitFor(() => expect(events.errors).toHaveLength(2));
            expect(events.errors[0]).toBe(`Unexpected server response: ${status}`);
            expect(events.errors[1]).toContain(clearError);
            expect(events.errors[1]).toMatch(/ Not reconnecting\.$/);
            await sleep(200);
            expect(server.handshakes).toHaveLength(2);
            expect(socket.readyState).toBe(ReconnectingWebSocket.ReadyState.CLOSED);
        });

        it("stops and reports a clear error when the first handshake gets 401 and the caller did not wait for open", async () => {
            const server = await startServer();
            server.respond(401);
            const socket = await connect(server, { waitForOpen: false });
            const events = recordEvents(socket);

            await vi.waitFor(() => expect(events.errors).toHaveLength(2));
            expect(events.errors[1]).toMatch(/^WebSocket authentication failed \(401\)/);
            await sleep(200);
            expect(server.handshakes).toHaveLength(1);
        });

        it("never reconnects after close() and leaves no timer behind", async () => {
            const server = await startServer();
            const socket = await connect(server);
            const closed = new Promise<void>((resolve) => socket.on("close", () => resolve()));

            vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"], shouldClearNativeTimers: true });
            server.connections[0].socket.close(1000);
            await closed;
            // The wrapper has scheduled its reconnect; close() must cancel exactly that timer.
            const pending = vi.getTimerCount();
            socket.close();
            expect(vi.getTimerCount()).toBe(pending - 1);
            await vi.advanceTimersByTimeAsync(10 * 60 * 1000);
            vi.useRealTimers();

            await sleep(100);
            expect(server.handshakes).toHaveLength(1);
        });

        it("never reconnects after socket.socket.close() either", async () => {
            const server = await startServer();
            const socket = await connect(server);

            socket.socket.close();

            await sleep(200);
            expect(server.handshakes).toHaveLength(1);
        });

        it("never reconnects after close() while the handshake is still in flight", async () => {
            const server = await startServer();
            server.respond("hold");
            const socket = await connect(server, { waitForOpen: false });
            await vi.waitFor(() => expect(server.handshakes).toHaveLength(1));

            socket.close();

            await sleep(200);
            expect(server.handshakes).toHaveLength(1);
        });

        it("never reconnects after the abort signal fires", async () => {
            const server = await startServer();
            const controller = new AbortController();
            await connect(server, { abortSignal: controller.signal });

            controller.abort();

            await sleep(200);
            expect(server.handshakes).toHaveLength(1);
        });

        it("keeps the old behavior with autoReconnect: false", async () => {
            const server = await startServer();
            const socket = await connect(server, { autoReconnect: false });
            socket.sendSubscribe(inboxSubscription);
            await vi.waitFor(() => expect(server.connections[0].received).toHaveLength(1));

            server.connections[0].socket.close(1000);

            await sleep(200);
            expect(server.handshakes).toHaveLength(1);
        });
    });
});

/**
 * Stands in for the browser WebSocket (or any runtime that hides the handshake status). Each instance
 * follows the next step of `script`: "refuse" fails the handshake with a bare error event and close
 * 1006; `{ openFor, code }` opens and closes after `openFor` ms.
 */
class ScriptedSocket {
    static readonly CONNECTING = 0;
    static readonly OPEN = 1;
    static readonly CLOSING = 2;
    static readonly CLOSED = 3;
    static script: Array<"refuse" | { openFor: number; code: number }> = [];
    static created = 0;
    static createdAt: number[] = [];

    readyState = ScriptedSocket.CONNECTING;
    binaryType = "blob";
    private readonly listeners = new Map<string, Set<(event: unknown) => void>>();

    constructor() {
        ScriptedSocket.created++;
        ScriptedSocket.createdAt.push(Date.now());
        const step = ScriptedSocket.script.shift() ?? "refuse";
        setTimeout(() => {
            if (step === "refuse") {
                this.readyState = ScriptedSocket.CLOSED;
                this.dispatch("error", { type: "error" });
                this.dispatch("close", { type: "close", code: 1006, reason: "" });
                return;
            }
            this.readyState = ScriptedSocket.OPEN;
            this.dispatch("open", { type: "open" });
            setTimeout(() => {
                this.readyState = ScriptedSocket.CLOSED;
                this.dispatch("close", { type: "close", code: step.code, reason: "" });
            }, step.openFor);
        }, 0);
    }

    addEventListener(type: string, listener: (event: unknown) => void): void {
        if (!this.listeners.has(type)) this.listeners.set(type, new Set());
        this.listeners.get(type)?.add(listener);
    }

    removeEventListener(type: string, listener: (event: unknown) => void): void {
        this.listeners.get(type)?.delete(listener);
    }

    send(): void {}

    close(): void {
        this.readyState = ScriptedSocket.CLOSED;
    }

    private dispatch(type: string, event: unknown): void {
        for (const listener of [...(this.listeners.get(type) ?? [])]) listener(event);
    }
}

/** Milliseconds between consecutive socket creations, on the fake clock. */
function creationGaps(): number[] {
    const at = ScriptedSocket.createdAt;
    return at.slice(1).map((time, index) => time - at[index]);
}

function scriptedSocket(
    policy: ReconnectPolicy,
    { maxRetries = 30, abortSignal }: { maxRetries?: number; abortSignal?: AbortSignal } = {},
) {
    const socket = new WebsocketsSocket({
        socket: new ReconnectingWebSocket({
            url: "wss://ws.example.test/v0",
            options: { WebSocket: ScriptedSocket, maxRetries },
            abortSignal,
        }),
    });
    enableAutoReconnect(socket, { maxRetries, abortSignal, policy });
    cleanups.push(() => socket.close());
    return socket;
}

describe("auto-reconnect backoff", () => {
    beforeEach(() => {
        ScriptedSocket.script = [];
        ScriptedSocket.created = 0;
        ScriptedSocket.createdAt = [];
    });

    it("uses full jitter, doubling from 1 s up to 60 s", () => {
        const ceilings = [0, 1, 2, 3, 4, 5, 6, 7, 20].map((attempt) =>
            backoffDelay(attempt, DEFAULT_RECONNECT_POLICY, () => 1),
        );
        expect(ceilings).toEqual([1000, 2000, 4000, 8000, 16000, 32000, 60000, 60000, 60000]);
        expect(backoffDelay(3, DEFAULT_RECONNECT_POLICY, () => 0)).toBe(0);
        expect(backoffDelay(3, DEFAULT_RECONNECT_POLICY, () => 0.25)).toBe(2000);
    });

    it("keeps retrying when the runtime hides the handshake status (browsers)", async () => {
        const socket = scriptedSocket(fastPolicy);
        const events = recordEvents(socket);

        await vi.waitFor(() => expect(ScriptedSocket.created).toBeGreaterThanOrEqual(5));
        expect(events.errors.some((message) => message.includes("Not reconnecting"))).toBe(false);

        socket.close();
        const created = ScriptedSocket.created;
        await sleep(100);
        expect(ScriptedSocket.created).toBe(created);
    });

    it("grows the delay across failures and resets it once a connection stays up", async () => {
        vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "Date"] });
        vi.spyOn(Math, "random").mockReturnValue(0.5);
        ScriptedSocket.script = ["refuse", "refuse", "refuse", { openFor: 6000, code: 1000 }, "refuse"];
        scriptedSocket(DEFAULT_RECONNECT_POLICY);

        await vi.advanceTimersByTimeAsync(20000);

        // Half of the 1 s, 2 s and 4 s ceilings. Connection 4 then stays up 6 s (past stableAfterMs),
        // so the wait after it is back to half of 1 s rather than half of 8 s.
        expect(creationGaps().slice(0, 4)).toEqual([500, 1000, 2000, 6000 + 500].map((ms) => expect.closeTo(ms, -1)));
    });

    it("does not reset the delay for a connection that drops right after opening", async () => {
        vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "Date"] });
        vi.spyOn(Math, "random").mockReturnValue(0.5);
        ScriptedSocket.script = ["refuse", { openFor: 100, code: 1000 }, "refuse"];
        scriptedSocket(DEFAULT_RECONNECT_POLICY);

        await vi.advanceTimersByTimeAsync(5000);

        // Connection 2 drops after 100 ms: the next wait is half of 2 s (attempt 1), not a reset 500 ms.
        expect(creationGaps().slice(0, 2)).toEqual([500, 100 + 1000].map((ms) => expect.closeTo(ms, -1)));
    });

    it.each([
        ["before", fastPolicy],
        ["after", { baseDelayMs: 4000, maxDelayMs: 4000, stableAfterMs: 5000 }],
    ])("takes over the generated socket's last retry with exactly one new connection (takeover fires %s its wait)", async (_order, policy) => {
        vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "Date"] });
        vi.spyOn(Math, "random").mockReturnValue(0.9);
        ScriptedSocket.script = [
            { openFor: 100, code: 1011 },
            { openFor: 60000, code: 1000 },
        ];
        const socket = scriptedSocket(policy, { maxRetries: 1 });

        // The drop after 100 ms uses the generated socket's only retry (a 1 s wait); the wrapper cancels
        // it and reconnects itself, after ~4.5 ms ("before") or ~3.6 s ("after").
        await vi.advanceTimersByTimeAsync(10000);

        expect(ScriptedSocket.created).toBe(2);
        expect(socket.readyState).toBe(ReconnectingWebSocket.ReadyState.OPEN);
    });

    it("stops when close() is called from the error handler", async () => {
        const socket = scriptedSocket(fastPolicy);
        socket.on("error", () => socket.close());

        await sleep(200);

        expect(ScriptedSocket.created).toBe(1);
    });

    it("stops when the abort signal fires while a reconnect is pending", async () => {
        vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "Date"] });
        vi.spyOn(Math, "random").mockReturnValue(0.5);
        const controller = new AbortController();
        scriptedSocket(DEFAULT_RECONNECT_POLICY, { abortSignal: controller.signal });
        await vi.advanceTimersByTimeAsync(1);
        expect(ScriptedSocket.created).toBe(1);
        expect(vi.getTimerCount()).toBe(1);

        controller.abort();
        expect(vi.getTimerCount()).toBe(0);
        await vi.advanceTimersByTimeAsync(10 * 60 * 1000);

        expect(ScriptedSocket.created).toBe(1);
    });
});
