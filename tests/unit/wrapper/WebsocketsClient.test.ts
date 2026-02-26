import { AgentMailClient } from "../../../src/wrapper/Client";
import { WebsocketsClient as FernWebsocketsClient } from "../../../src/api/resources/websockets/client/Client";
import type { WebsocketsSocket } from "../../../src/api/resources/websockets/client/Socket";

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

  it("should auto-populate apiKey from client options", async () => {
    const client = new AgentMailClient({ apiKey: "am_us_test123" });
    await client.websockets.connect();
    expect(connectSpy).toHaveBeenCalledWith({ apiKey: "am_us_test123" });
  });

  it("should auto-populate apiKey from walletAddress", async () => {
    const client = new AgentMailClient({
      walletAddress: "0xabc",
      protocol: "x402",
    });
    await client.websockets.connect();
    expect(connectSpy).toHaveBeenCalledWith({ apiKey: "0xabc" });
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
