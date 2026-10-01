import { WebsocketsClient as FernWebsocketsClient } from "../../../src/api/resources/websockets/client/Client";
import { WebsocketsSocket } from "../../../src/api/resources/websockets/client/Socket";
import { ReconnectingWebSocket } from "../../../src/core/websocket/ws";
import { SDK_VERSION } from "../../../src/version";
import { AgentMailClient } from "../../../src/wrapper/Client";
import * as mppHelpers from "../../../src/wrapper/mppx";
import * as x402Helpers from "../../../src/wrapper/x402";

const sdkHeaders = { "X-Fern-SDK-Name": "agentmail", "X-Fern-SDK-Version": SDK_VERSION };

function mockConnect() {
    return vi.spyOn(FernWebsocketsClient.prototype, "connect").mockImplementation(async () => {
        // startClosed: a real socket that never dials, so auto-reconnect has something to attach to.
        const socket = new WebsocketsSocket({
            socket: new ReconnectingWebSocket({ url: "ws://127.0.0.1", options: { startClosed: true } }),
        });
        vi.spyOn(socket, "waitForOpen").mockResolvedValue(socket.socket);
        return socket;
    });
}

describe("WebsocketsClient wrapper", () => {
    const originalEnv = process.env.AGENTMAIL_API_KEY;
    let connectSpy: ReturnType<typeof mockConnect>;

    beforeEach(() => {
        connectSpy = mockConnect();
    });

    afterEach(() => {
        connectSpy.mockRestore();
        if (originalEnv !== undefined) {
            process.env.AGENTMAIL_API_KEY = originalEnv;
        } else {
            delete process.env.AGENTMAIL_API_KEY;
        }
    });

    describe("with apiKey", () => {
        it("should auto-populate apiKey from client options", async () => {
            const client = new AgentMailClient({ apiKey: "am_us_test123" });
            await client.websockets.connect();
            expect(connectSpy).toHaveBeenCalledWith({
                apiKey: "am_us_test123",
                reconnectAttempts: 30,
                headers: sdkHeaders,
            });
        });

        it("should auto-populate apiKey from env var", async () => {
            process.env.AGENTMAIL_API_KEY = "am_eu_from_env";
            const client = new AgentMailClient({});
            await client.websockets.connect();
            expect(connectSpy).toHaveBeenCalledWith({
                apiKey: "am_eu_from_env",
                reconnectAttempts: 30,
                headers: sdkHeaders,
            });
        });

        it("should prefer explicit apiKey in connect args", async () => {
            const client = new AgentMailClient({ apiKey: "am_us_test123" });
            await client.websockets.connect({ apiKey: "override_key" });
            expect(connectSpy).toHaveBeenCalledWith({
                apiKey: "override_key",
                reconnectAttempts: 30,
                headers: sdkHeaders,
            });
        });

        it("should forward other connect args alongside auto-populated apiKey", async () => {
            const client = new AgentMailClient({ apiKey: "am_us_test123" });
            await client.websockets.connect({ debug: true, reconnectAttempts: 5 });
            expect(connectSpy).toHaveBeenCalledWith({
                debug: true,
                reconnectAttempts: 5,
                apiKey: "am_us_test123",
                headers: sdkHeaders,
            });
        });

        it("should not forward wrapper-only options", async () => {
            const client = new AgentMailClient({ apiKey: "am_us_test123" });
            await client.websockets.connect({ waitForOpen: false, autoReconnect: false });
            expect(connectSpy).toHaveBeenCalledWith({
                apiKey: "am_us_test123",
                reconnectAttempts: 30,
                headers: sdkHeaders,
            });
        });
    });

    describe("SDK headers", () => {
        it("should let user headers override the SDK headers", async () => {
            const client = new AgentMailClient({ apiKey: "am_us_test123" });
            await client.websockets.connect({ headers: { "X-Fern-SDK-Version": "custom", "X-Extra": "1" } });
            expect(connectSpy).toHaveBeenCalledWith(
                expect.objectContaining({
                    headers: { "X-Fern-SDK-Name": "agentmail", "X-Fern-SDK-Version": "custom", "X-Extra": "1" },
                }),
            );
        });
    });

    describe("with x402", () => {
        const mockX402Client = {};
        const mockCredentials = { "PAYMENT-SIGNATURE": "signed-payload" };

        it("should call getPaymentCredentials and pass as queryParams", async () => {
            const spy = vi.spyOn(x402Helpers, "getPaymentCredentials").mockResolvedValue(mockCredentials);

            const client = new AgentMailClient({ x402: mockX402Client });
            await client.websockets.connect();

            expect(spy).toHaveBeenCalled();
            expect(connectSpy).toHaveBeenCalledWith(
                expect.objectContaining({
                    queryParams: expect.objectContaining(mockCredentials),
                    headers: sdkHeaders,
                }),
            );

            spy.mockRestore();
        });

        it("should let user queryParams override payment credentials", async () => {
            const spy = vi
                .spyOn(x402Helpers, "getPaymentCredentials")
                .mockResolvedValue({ "PAYMENT-SIGNATURE": "from-x402" });

            const client = new AgentMailClient({ x402: mockX402Client });
            await client.websockets.connect({ queryParams: { "PAYMENT-SIGNATURE": "user-override" } });

            expect(connectSpy).toHaveBeenCalledWith(
                expect.objectContaining({
                    queryParams: expect.objectContaining({ "PAYMENT-SIGNATURE": "user-override" }),
                }),
            );

            spy.mockRestore();
        });
    });

    describe("with mppx", () => {
        const mockMppClient = {
            fetch: vi.fn(),
            rawFetch: vi.fn(),
            transport: { setCredential: vi.fn() },
            createCredential: vi.fn(),
        };
        const mockCredentials = { Authorization: "Payment signed-credential" };

        it("should call getPaymentCredentials and pass as queryParams", async () => {
            const spy = vi.spyOn(mppHelpers, "getPaymentCredentials").mockResolvedValue(mockCredentials);

            const client = new AgentMailClient({ mppx: mockMppClient });
            await client.websockets.connect();

            expect(spy).toHaveBeenCalled();
            expect(connectSpy).toHaveBeenCalledWith(
                expect.objectContaining({
                    queryParams: expect.objectContaining(mockCredentials),
                    headers: sdkHeaders,
                }),
            );

            spy.mockRestore();
        });

        it("should let user queryParams override payment credentials", async () => {
            const spy = vi.spyOn(mppHelpers, "getPaymentCredentials").mockResolvedValue({ Authorization: "from-mpp" });

            const client = new AgentMailClient({ mppx: mockMppClient });
            await client.websockets.connect({ queryParams: { Authorization: "user-override" } });

            expect(connectSpy).toHaveBeenCalledWith(
                expect.objectContaining({
                    queryParams: expect.objectContaining({ Authorization: "user-override" }),
                }),
            );

            spy.mockRestore();
        });
    });
});
