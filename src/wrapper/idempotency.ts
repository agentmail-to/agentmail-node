/**
 * Auto-minting of `Idempotency-Key` for the send endpoints.
 *
 * This lives in src/wrapper (the sanctioned custom-code area) rather than in
 * the generated code or core fetcher: Fern's generator can only emit a typed
 * pass-through for idempotency headers (`requestOptions.idempotencyKey`);
 * generating a default VALUE is client behavior. Implementing it here as
 * subclass overrides means no generated files are pinned in .fernignore.
 *
 * The generated `__send`-style methods merge `requestOptions.idempotencyKey`
 * into the request headers ONCE, before calling `core.fetcher`, and retries
 * happen INSIDE the fetcher reusing those headers — so defaulting the key at
 * the method level is automatically retry-stable: every internal retry of one
 * logical call carries the SAME key, while separate calls get fresh keys.
 */
import type * as AgentMail from "../api/index.js";
import { InboxesClient as FernInboxesClient } from "../api/resources/inboxes/client/Client.js";
import { DraftsClient as FernDraftsClient } from "../api/resources/inboxes/resources/drafts/client/Client.js";
import { MessagesClient as FernMessagesClient } from "../api/resources/inboxes/resources/messages/client/Client.js";
import type * as core from "../core/index.js";

/**
 * Generate a RFC 4122 version 4 UUID using the environment-agnostic Web Crypto
 * API that this SDK already targets (available in Node 19+, browsers, Deno, Bun,
 * Cloudflare Workers, etc.). Falls back to a `getRandomValues`-based
 * implementation when `crypto.randomUUID` is unavailable, and finally to
 * `Math.random` as a last resort so the SDK never throws in an exotic runtime.
 *
 * No new npm dependencies are introduced.
 */
export function uuidv4(): string {
    const cryptoObj: Crypto | undefined =
        typeof globalThis !== "undefined" ? (globalThis.crypto as Crypto | undefined) : undefined;

    if (cryptoObj != null && typeof cryptoObj.randomUUID === "function") {
        return cryptoObj.randomUUID();
    }

    const bytes = new Uint8Array(16);
    if (cryptoObj != null && typeof cryptoObj.getRandomValues === "function") {
        cryptoObj.getRandomValues(bytes);
    } else {
        for (let i = 0; i < bytes.length; i++) {
            bytes[i] = Math.floor(Math.random() * 256);
        }
    }

    // Per RFC 4122 §4.4: set the version (4) and variant (10xx) bits.
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/**
 * Default `idempotencyKey` to a fresh UUID4 when the caller has not supplied
 * one. Written as `requestOptions?.idempotencyKey ?? uuidv4()` (NOT a
 * spread-over-default) so an explicit `idempotencyKey: undefined` still gets a
 * minted key, while any caller-supplied value always wins. A caller-supplied
 * raw `requestOptions.headers["Idempotency-Key"]` also wins, because the
 * generated header merge applies `requestOptions.headers` last.
 */
function withDefaultIdempotencyKey<T extends { idempotencyKey?: string | undefined } | undefined>(
    requestOptions: T,
): NonNullable<T> {
    return { ...requestOptions, idempotencyKey: requestOptions?.idempotencyKey ?? uuidv4() } as NonNullable<T>;
}

export class MessagesClient extends FernMessagesClient {
    public override send(
        inbox_id: AgentMail.inboxes.InboxId,
        request: AgentMail.SendMessageRequest,
        requestOptions?: FernMessagesClient.IdempotentRequestOptions,
    ): core.HttpResponsePromise<AgentMail.SendMessageResponse> {
        return super.send(inbox_id, request, withDefaultIdempotencyKey(requestOptions));
    }

    public override reply(
        inbox_id: AgentMail.inboxes.InboxId,
        message_id: AgentMail.MessageId,
        request: AgentMail.ReplyToMessageRequest,
        requestOptions?: FernMessagesClient.IdempotentRequestOptions,
    ): core.HttpResponsePromise<AgentMail.SendMessageResponse> {
        return super.reply(inbox_id, message_id, request, withDefaultIdempotencyKey(requestOptions));
    }

    public override replyAll(
        inbox_id: AgentMail.inboxes.InboxId,
        message_id: AgentMail.MessageId,
        request: AgentMail.ReplyAllMessageRequest,
        requestOptions?: FernMessagesClient.IdempotentRequestOptions,
    ): core.HttpResponsePromise<AgentMail.SendMessageResponse> {
        return super.replyAll(inbox_id, message_id, request, withDefaultIdempotencyKey(requestOptions));
    }

    public override forward(
        inbox_id: AgentMail.inboxes.InboxId,
        message_id: AgentMail.MessageId,
        request: AgentMail.SendMessageRequest,
        requestOptions?: FernMessagesClient.IdempotentRequestOptions,
    ): core.HttpResponsePromise<AgentMail.SendMessageResponse> {
        return super.forward(inbox_id, message_id, request, withDefaultIdempotencyKey(requestOptions));
    }
}

export class DraftsClient extends FernDraftsClient {
    public override send(
        inbox_id: AgentMail.inboxes.InboxId,
        draft_id: AgentMail.DraftId,
        request: AgentMail.UpdateMessageRequest,
        requestOptions?: FernDraftsClient.IdempotentRequestOptions,
    ): core.HttpResponsePromise<AgentMail.SendMessageResponse> {
        return super.send(inbox_id, draft_id, request, withDefaultIdempotencyKey(requestOptions));
    }
}

export class InboxesClient extends FernInboxesClient {
    protected declare _messages: MessagesClient | undefined;
    protected declare _drafts: DraftsClient | undefined;

    public override get messages(): MessagesClient {
        return (this._messages ??= new MessagesClient(this._options));
    }

    public override get drafts(): DraftsClient {
        return (this._drafts ??= new DraftsClient(this._options));
    }
}
