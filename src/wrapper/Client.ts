import { AgentMailClient as FernAgentMailClient } from "../Client.js";
import { Supplier } from "../core/index.js";
import { AgentMailEnvironment } from "../environments.js";
import { WebsocketsClient } from "./WebsocketsClient.js";

export type PaymentProtocol = "x402" | "mpp";

type SharedOptions = Omit<FernAgentMailClient.Options, "apiKey">;

export declare namespace AgentMailClient {
  export type Options = SharedOptions &
    (
      | { privateKey: string; protocol: PaymentProtocol; apiKey?: never }
      | {
          apiKey?: Supplier<string>;
          privateKey?: never;
          protocol?: never;
        }
    );
  export type RequestOptions = FernAgentMailClient.RequestOptions;
}

export class AgentMailClient extends FernAgentMailClient {
  private _wrappedWebsockets: WebsocketsClient | undefined;

  public override get websockets(): WebsocketsClient {
    return (this._wrappedWebsockets ??= new WebsocketsClient(this._options));
  }

  constructor(options: AgentMailClient.Options = {}) {
    if (options.privateKey) {
      const { privateKey, protocol, ...rest } = options;
      const fernOptions: FernAgentMailClient.Options = {
        ...rest,
        apiKey: privateKey,
      };
      if (!fernOptions.environment && !fernOptions.baseUrl) {
        fernOptions.environment =
          protocol === "mpp"
            ? AgentMailEnvironment.ProdMpp
            : AgentMailEnvironment.ProdX402;
      }
      super(fernOptions);
    } else {
      let fernOptions: FernAgentMailClient.Options = options;
      if (!fernOptions.environment && !fernOptions.baseUrl) {
        fernOptions = {
          ...fernOptions,
          environment: async () => {
            const apiKey =
              (await Supplier.get(fernOptions.apiKey)) ??
              process.env.AGENTMAIL_API_KEY;
            if (apiKey?.startsWith("am_eu_"))
              return AgentMailEnvironment.EuProd;
            return AgentMailEnvironment.Prod;
          },
        };
      }
      super(fernOptions);
    }
  }
}
