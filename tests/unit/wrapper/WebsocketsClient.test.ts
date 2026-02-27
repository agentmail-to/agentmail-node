import { AgentMailClient } from "../../../src/wrapper/Client";
import { WebsocketsClient as FernWebsocketsClient } from "../../../src/api/resources/websockets/client/Client";
import type { WebsocketsSocket } from "../../../src/api/resources/websockets/client/Socket";
import * as x402Helpers from "../../../src/wrapper/x402";
import * as mppHelpers from "../../../src/wrapper/mppx";

function mockConnect() {
    return vi.spyOn(FernWebsocketsClient.prototype, "connect").mockResolvedValue({} as WebsocketsSocket);
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
            expect(connectSpy).toHaveBeenCalledWith({ apiKey: "am_us_test123" });
        });

        it("should auto-populate apiKey from env var", async () => {
            process.env.AGENTMAIL_API_KEY = "am_eu_from_env";
            const client = new AgentMailClient({});
            await client.websockets.connect();
            expect(connectSpy).toHaveBeenCalledWith({ apiKey: "am_eu_from_env" });
        });

        it("should prefer explicit apiKey in connect args", async () => {
            const client = new AgentMailClient({ apiKey: "am_us_test123" });
            await client.websockets.connect({ apiKey: "override_key" });
            expect(connectSpy).toHaveBeenCalledWith({ apiKey: "override_key" });
        });

        it("should forward other connect args alongside auto-populated apiKey", async () => {
            const client = new AgentMailClient({ apiKey: "am_us_test123" });
            await client.websockets.connect({ debug: true, reconnectAttempts: 5 });
            expect(connectSpy).toHaveBeenCalledWith({
                debug: true,
                reconnectAttempts: 5,
                apiKey: "am_us_test123",
            });
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
