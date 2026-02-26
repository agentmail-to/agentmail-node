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

  describe("with walletAddress", () => {
    it("should select ProdX402 with x402 protocol", async () => {
      const client = new AgentMailClient({
        walletAddress: "0xabc123",
        protocol: "x402",
      });
      const env = await Supplier.get(client["_options"].environment);
      expect(env).toEqual(AgentMailEnvironment.ProdX402);
    });

    it("should select ProdMpp with mpp protocol", async () => {
      const client = new AgentMailClient({
        walletAddress: "0xabc123",
        protocol: "mpp",
      });
      const env = await Supplier.get(client["_options"].environment);
      expect(env).toEqual(AgentMailEnvironment.ProdMpp);
    });

    it("should pass walletAddress as apiKey to auth", async () => {
      const client = new AgentMailClient({
        walletAddress: "0xabc123",
        protocol: "x402",
      });
      const apiKey = await Supplier.get(client["_options"].apiKey);
      expect(apiKey).toBe("0xabc123");
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
      expect(await Supplier.get(client["_options"].baseUrl)).toBe(
        "https://custom.example.com"
      );
    });

    it("should not override environment for walletAddress when explicitly set", async () => {
      const client = new AgentMailClient({
        walletAddress: "0xabc123",
        protocol: "mpp",
        environment: AgentMailEnvironment.ProdX402,
      });
      const env = await Supplier.get(client["_options"].environment);
      expect(env).toEqual(AgentMailEnvironment.ProdX402);
    });
  });
});
