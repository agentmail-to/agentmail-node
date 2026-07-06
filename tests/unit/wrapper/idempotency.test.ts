import { AgentMailClient } from "../../../src/wrapper/Client";

const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function jsonResponse(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

function sendMessageResponse(): Response {
    return jsonResponse({ message_id: "msg_123", thread_id: "thread_123" });
}

/** Pull the Idempotency-Key out of the RequestInit a mocked fetch was called with. */
function idempotencyKeyFromCall(call: unknown[]): string | null {
    const init = call[1] as RequestInit;
    return new Headers(init.headers).get("Idempotency-Key");
}

function makeClient(fetchMock: typeof fetch): AgentMailClient {
    return new AgentMailClient({ apiKey: "am_us_test123", fetch: fetchMock });
}

describe("Idempotency-Key auto-minting (wrapper)", () => {
    it("mints a valid UUID4 Idempotency-Key on messages.send with none supplied", async () => {
        const fetchMock = vi.fn().mockResolvedValue(sendMessageResponse());
        const client = makeClient(fetchMock);

        await client.inboxes.messages.send("inbox_id", { text: "hi" });

        expect(fetchMock).toHaveBeenCalledTimes(1);
        const key = idempotencyKeyFromCall(fetchMock.mock.calls[0]);
        expect(key).toMatch(UUID_V4);
    });

    it("uses a caller-supplied requestOptions.idempotencyKey verbatim", async () => {
        const fetchMock = vi.fn().mockResolvedValue(sendMessageResponse());
        const client = makeClient(fetchMock);

        await client.inboxes.messages.send("inbox_id", { text: "hi" }, { idempotencyKey: "caller-key" });

        const key = idempotencyKeyFromCall(fetchMock.mock.calls[0]);
        expect(key).toBe("caller-key");
    });

    it("mints when the caller passes an explicit idempotencyKey: undefined", async () => {
        const fetchMock = vi.fn().mockResolvedValue(sendMessageResponse());
        const client = makeClient(fetchMock);

        await client.inboxes.messages.send("inbox_id", { text: "hi" }, { idempotencyKey: undefined });

        const key = idempotencyKeyFromCall(fetchMock.mock.calls[0]);
        expect(key).toMatch(UUID_V4);
    });

    it("lets a caller-supplied raw Idempotency-Key header win over the minted key", async () => {
        const fetchMock = vi.fn().mockResolvedValue(sendMessageResponse());
        const client = makeClient(fetchMock);

        await client.inboxes.messages.send(
            "inbox_id",
            { text: "hi" },
            { headers: { "Idempotency-Key": "raw-header-key" } },
        );

        const key = idempotencyKeyFromCall(fetchMock.mock.calls[0]);
        expect(key).toBe("raw-header-key");
    });

    it("carries the IDENTICAL minted key across internal retries (503 then 200)", async () => {
        const fetchMock = vi
            .fn()
            .mockResolvedValueOnce(new Response("busy", { status: 503, headers: { "Retry-After": "1" } }))
            .mockResolvedValueOnce(sendMessageResponse());
        const client = makeClient(fetchMock);

        await client.inboxes.messages.send("inbox_id", { text: "hi" }, { maxRetries: 1 });

        expect(fetchMock).toHaveBeenCalledTimes(2);
        const first = idempotencyKeyFromCall(fetchMock.mock.calls[0]);
        const second = idempotencyKeyFromCall(fetchMock.mock.calls[1]);
        expect(first).toMatch(UUID_V4);
        expect(second).toBe(first);
    }, 15000);

    it("mints DIFFERENT keys for two separate calls", async () => {
        const fetchMock = vi.fn(async () => sendMessageResponse());
        const client = makeClient(fetchMock);

        await client.inboxes.messages.send("inbox_id", { text: "one" });
        await client.inboxes.messages.send("inbox_id", { text: "two" });

        const first = idempotencyKeyFromCall(fetchMock.mock.calls[0]);
        const second = idempotencyKeyFromCall(fetchMock.mock.calls[1]);
        expect(first).toMatch(UUID_V4);
        expect(second).toMatch(UUID_V4);
        expect(second).not.toBe(first);
    });

    it("mints on messages.reply", async () => {
        const fetchMock = vi.fn().mockResolvedValue(sendMessageResponse());
        const client = makeClient(fetchMock);

        await client.inboxes.messages.reply("inbox_id", "message_id", { text: "hi" });

        expect(idempotencyKeyFromCall(fetchMock.mock.calls[0])).toMatch(UUID_V4);
    });

    it("mints on messages.replyAll", async () => {
        const fetchMock = vi.fn().mockResolvedValue(sendMessageResponse());
        const client = makeClient(fetchMock);

        await client.inboxes.messages.replyAll("inbox_id", "message_id", { text: "hi" });

        expect(idempotencyKeyFromCall(fetchMock.mock.calls[0])).toMatch(UUID_V4);
    });

    it("mints on messages.forward", async () => {
        const fetchMock = vi.fn().mockResolvedValue(sendMessageResponse());
        const client = makeClient(fetchMock);

        await client.inboxes.messages.forward("inbox_id", "message_id", { text: "hi" });

        expect(idempotencyKeyFromCall(fetchMock.mock.calls[0])).toMatch(UUID_V4);
    });

    it("mints on drafts.send", async () => {
        const fetchMock = vi.fn().mockResolvedValue(sendMessageResponse());
        const client = makeClient(fetchMock);

        await client.inboxes.drafts.send("inbox_id", "draft_id", {});

        expect(idempotencyKeyFromCall(fetchMock.mock.calls[0])).toMatch(UUID_V4);
    });

    it("does NOT attach an Idempotency-Key to non-send methods", async () => {
        const fetchMock = vi
            .fn()
            .mockResolvedValueOnce(jsonResponse({ count: 0, messages: [] }))
            .mockResolvedValueOnce(
                jsonResponse({
                    inbox_id: "inbox_id",
                    organization_id: "org_id",
                    display_name: "Test",
                    created_at: "2026-01-01T00:00:00Z",
                    updated_at: "2026-01-01T00:00:00Z",
                }),
            );
        const client = makeClient(fetchMock);

        await client.inboxes.messages.list("inbox_id");
        await client.inboxes.create({ username: "test" });

        expect(fetchMock).toHaveBeenCalledTimes(2);
        expect(idempotencyKeyFromCall(fetchMock.mock.calls[0])).toBeNull();
        expect(idempotencyKeyFromCall(fetchMock.mock.calls[1])).toBeNull();
    });
});
