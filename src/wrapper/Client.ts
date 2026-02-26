import { AgentMailClient as FernAgentMailClient } from "../Client.js";
import { Supplier } from "../core/index.js";
import { AgentMailEnvironment } from "../environments.js";

export type PaymentProtocol = "x402" | "mpp";

type SharedOptions = Omit<FernAgentMailClient.Options, "apiKey">;

export declare namespace AgentMailClient {
  export type Options = SharedOptions &
    (
      | { walletAddress: string; protocol: PaymentProtocol; apiKey?: never }
      | {
          apiKey?: Supplier<string>;
          walletAddress?: never;
          protocol?: never;
        }
    );
  export type RequestOptions = FernAgentMailClient.RequestOptions;
}

export class AgentMailClient extends FernAgentMailClient {
  constructor(options: AgentMailClient.Options = {}) {
    if (options.walletAddress) {
      const { walletAddress, protocol, ...rest } = options;
      const fernOptions: FernAgentMailClient.Options = {
        ...rest,
        apiKey: walletAddress,
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
