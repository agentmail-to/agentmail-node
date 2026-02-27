import { AgentMailClient } from "../../../src/wrapper/Client";
import { AgentMailEnvironment } from "../../../src/environments";
import { Supplier } from "../../../src/core";

describe("AgentMailClient environment selection", () => {
    const originalEnv = process.env.AGENTMAIL_API_KEY;

    afterEach(() => {
        if (originalEnv !== undefined) {
            process.env.AGENTMAIL_API_KEY = originalEnv;
        } else {
            delete process.env.AGENTMAIL_API_KEY;
        }
    });

    describe("with apiKey", () => {
        it("should select Prod for am_us_ prefix", async () => {
            const client = new AgentMailClient({ apiKey: "am_us_test123" });
            const env = await Supplier.get(client["_options"].environment);
            expect(env).toEqual(AgentMailEnvironment.Prod);
        });

        it("should select EuProd for am_eu_ prefix", async () => {
            const client = new AgentMailClient({ apiKey: "am_eu_test123" });
            const env = await Supplier.get(client["_options"].environment);
            expect(env).toEqual(AgentMailEnvironment.EuProd);
        });

        it("should default to Prod for unknown prefix", async () => {
            const client = new AgentMailClient({ apiKey: "unknown_key" });
            const env = await Supplier.get(client["_options"].environment);
            expect(env).toEqual(AgentMailEnvironment.Prod);
        });

        it("should default to Prod when no apiKey is provided", async () => {
            delete process.env.AGENTMAIL_API_KEY;
            const client = new AgentMailClient({});
            const env = await Supplier.get(client["_options"].environment);
            expect(env).toEqual(AgentMailEnvironment.Prod);
        });

        it("should resolve apiKey from env var", async () => {
            process.env.AGENTMAIL_API_KEY = "am_eu_from_env";
            const client = new AgentMailClient({});
            const env = await Supplier.get(client["_options"].environment);
            expect(env).toEqual(AgentMailEnvironment.EuProd);
        });

        it("should prefer explicit apiKey over env var", async () => {
            process.env.AGENTMAIL_API_KEY = "am_eu_from_env";
            const client = new AgentMailClient({ apiKey: "am_us_explicit" });
            const env = await Supplier.get(client["_options"].environment);
            expect(env).toEqual(AgentMailEnvironment.Prod);
        });

        it("should resolve apiKey from supplier function", async () => {
            const client = new AgentMailClient({ apiKey: () => "am_eu_lazy" });
            const env = await Supplier.get(client["_options"].environment);
            expect(env).toEqual(AgentMailEnvironment.EuProd);
        });
    });

    describe("with x402", () => {
        const mockX402Client = {};
        const mockWrappedFetch = vi.fn().mockResolvedValue(new Response());

        beforeEach(() => {
            vi.doMock("@x402/fetch", () => ({
                wrapFetchWithPayment: vi.fn(() => mockWrappedFetch),
            }));
        });

        afterEach(() => {
            vi.doUnmock("@x402/fetch");
            mockWrappedFetch.mockClear();
        });

        it("should derive ProdX402 environment", async () => {
            const client = new AgentMailClient({ x402: mockX402Client });
            const env = await Supplier.get(client["_options"].environment);
            expect(env).toEqual(AgentMailEnvironment.ProdX402);
        });

        it("should not override explicitly set environment", async () => {
            const client = new AgentMailClient({
                x402: mockX402Client,
                environment: AgentMailEnvironment.EuProd,
            });
            const env = await Supplier.get(client["_options"].environment);
            expect(env).toEqual(AgentMailEnvironment.EuProd);
        });

        it("should lazily wrap fetch with wrapFetchWithPayment", async () => {
            const client = new AgentMailClient({ x402: mockX402Client });
            const customFetch = client["_options"].fetch!;

            await customFetch(new Request("https://example.com"));

            const x402 = await vi.importMock<typeof import("@x402/fetch")>("@x402/fetch");
            expect(x402.wrapFetchWithPayment).toHaveBeenCalledWith(fetch, mockX402Client);
            expect(mockWrappedFetch).toHaveBeenCalled();
        });
    });

    describe("with mppx", () => {
        const mockMppFetch = vi.fn().mockResolvedValue(new Response());
        const mockMppClient = {
            fetch: mockMppFetch,
            transport: { setCredential: vi.fn() },
            createCredential: vi.fn(),
        };

        it("should derive ProdMpp environment", async () => {
            const client = new AgentMailClient({ mppx: mockMppClient });
            const env = await Supplier.get(client["_options"].environment);
            expect(env).toEqual(AgentMailEnvironment.ProdMpp);
        });

        it("should not override explicitly set environment", async () => {
            const client = new AgentMailClient({
                mppx: mockMppClient,
                environment: AgentMailEnvironment.EuProd,
            });
            const env = await Supplier.get(client["_options"].environment);
            expect(env).toEqual(AgentMailEnvironment.EuProd);
        });

        it("should use mppx.fetch as the fetch implementation", () => {
            const client = new AgentMailClient({ mppx: mockMppClient });
            expect(client["_options"].fetch).toBe(mockMppFetch);
        });
    });

    describe("explicit overrides", () => {
        it("should not override explicitly set environment", async () => {
            const client = new AgentMailClient({
                apiKey: "am_eu_test123",
                environment: AgentMailEnvironment.Prod,
            });
            const env = await Supplier.get(client["_options"].environment);
            expect(env).toEqual(AgentMailEnvironment.Prod);
        });

        it("should not override explicitly set baseUrl", async () => {
            const client = new AgentMailClient({
                apiKey: "am_eu_test123",
                baseUrl: "https://custom.example.com",
            });
            expect(client["_options"].environment).toBeUndefined();
            expect(await Supplier.get(client["_options"].baseUrl)).toBe("https://custom.example.com");
        });
    });
});
