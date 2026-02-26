import type { x402Client } from "@x402/fetch";
import { AgentMailClient as FernAgentMailClient } from "../Client.js";
import { Supplier } from "../core/index.js";
import { AgentMailEnvironment } from "../environments.js";
import { WebsocketsClient } from "./WebsocketsClient.js";

type SharedOptions = Omit<FernAgentMailClient.Options, "apiKey">;

export declare namespace AgentMailClient {
    export type Options = SharedOptions &
        ({ x402: x402Client; apiKey?: never } | { apiKey?: Supplier<string>; x402?: never });
    export type RequestOptions = FernAgentMailClient.RequestOptions;
}

export class AgentMailClient extends FernAgentMailClient {
    protected declare _websockets: WebsocketsClient | undefined;
    private readonly _x402Client: x402Client | undefined;

    public override get websockets(): WebsocketsClient {
        return (this._websockets ??= new WebsocketsClient(this._options, this._x402Client));
    }

    constructor(options: AgentMailClient.Options = {}) {
        if (options.x402) {
            const { x402, ...rest } = options;

            let wrappedFetch: typeof fetch | undefined;
            const fernOptions: FernAgentMailClient.Options = {
                ...rest,
                fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
                    if (!wrappedFetch) {
                        const { wrapFetchWithPayment } = await import("@x402/fetch");
                        wrappedFetch = wrapFetchWithPayment(fetch, x402);
                    }
                    return wrappedFetch(input, init);
                },
            };

            if (!fernOptions.environment && !fernOptions.baseUrl) {
                fernOptions.environment = AgentMailEnvironment.ProdX402;
            }

            super(fernOptions);

            this._x402Client = x402;
        } else {
            let fernOptions: FernAgentMailClient.Options = options;

            if (!fernOptions.environment && !fernOptions.baseUrl) {
                fernOptions = {
                    ...fernOptions,
                    environment: async () => {
                        const apiKey = (await Supplier.get(fernOptions.apiKey)) ?? process.env.AGENTMAIL_API_KEY;
                        if (apiKey?.startsWith("am_eu_")) return AgentMailEnvironment.EuProd;
                        return AgentMailEnvironment.Prod;
                    },
                };
            }

            super(fernOptions);

            this._x402Client = undefined;
        }
    }
}
