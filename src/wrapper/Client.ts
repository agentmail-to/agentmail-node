import type { x402Client } from "@x402/fetch";
import type { Mppx } from "mppx/client";

import { Supplier } from "../core/index.js";
import { NoOpAuthProvider } from "../core/auth/NoOpAuthProvider.js";
import { AgentMailEnvironment } from "../environments.js";
import { AgentMailClient as FernAgentMailClient } from "../Client.js";
import { type GetPaymentHeaders, WebsocketsClient } from "./WebsocketsClient.js";

import { getPaymentHeaders as getX402PaymentHeaders } from "./x402.js";
import { getPaymentHeaders as getMppPaymentHeaders } from "./mpp.js";

type SharedOptions = Omit<FernAgentMailClient.Options, "apiKey">;

export declare namespace AgentMailClient {
    export type Options = SharedOptions &
        (
            | { x402: x402Client; mpp?: never; apiKey?: never }
            | { mpp: Mppx.Mppx; x402?: never; apiKey?: never }
            | { apiKey?: Supplier<string>; x402?: never; mpp?: never }
        );
    export type RequestOptions = FernAgentMailClient.RequestOptions;
}

export class AgentMailClient extends FernAgentMailClient {
    protected declare _websockets: WebsocketsClient | undefined;
    private readonly _getPaymentHeaders: GetPaymentHeaders | undefined;

    public override get websockets(): WebsocketsClient {
        return (this._websockets ??= new WebsocketsClient(this._options, this._getPaymentHeaders));
    }

    constructor(options: AgentMailClient.Options = {}) {
        if (options.x402) {
            const { x402, ...rest } = options;

            let wrappedFetch: typeof fetch | undefined;
            const fernOptions = {
                ...rest,
                authProvider: new NoOpAuthProvider(),
                fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
                    if (!wrappedFetch) {
                        const mod = await import("@x402/fetch");
                        wrappedFetch = mod.wrapFetchWithPayment(fetch, x402);
                    }
                    return wrappedFetch(input, init);
                },
            };

            if (!fernOptions.environment && !fernOptions.baseUrl) {
                fernOptions.environment = AgentMailEnvironment.ProdX402;
            }

            super(fernOptions);

            this._getPaymentHeaders = (wsUrl) => getX402PaymentHeaders(wsUrl, x402);
        } else if (options.mpp) {
            const { mpp, ...rest } = options;

            const fernOptions = {
                ...rest,
                authProvider: new NoOpAuthProvider(),
                fetch: mpp.fetch,
            };

            if (!fernOptions.environment && !fernOptions.baseUrl) {
                fernOptions.environment = AgentMailEnvironment.ProdMpp;
            }

            super(fernOptions);

            this._getPaymentHeaders = (wsUrl) => getMppPaymentHeaders(wsUrl, mpp);
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

            this._getPaymentHeaders = undefined;
        }
    }
}
