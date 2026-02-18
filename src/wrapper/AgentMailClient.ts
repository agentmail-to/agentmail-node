import { AgentMailClient as FernAgentMailClient } from "../Client.js";
import type { BaseClientOptions, BaseRequestOptions } from "../BaseClient.js";
import { WebsocketsClient } from "../api/resources/websockets/client/Client.js";
import { X402WebsocketsClient } from "./X402WebsocketsClient.js";

export declare namespace AgentMailClient {
    export interface Options extends BaseClientOptions {
        /**
         * An x402Client instance for automatic payment handling on HTTP and WebSocket calls.
         *
         * @example
         * ```typescript
         * import { x402Client } from "@x402/fetch";
         * import { registerExactEvmScheme } from "@x402/evm/exact/client";
         * import { privateKeyToAccount } from "viem/accounts";
         *
         * const x402 = new x402Client();
         * registerExactEvmScheme(x402, { signer: privateKeyToAccount("0x...") });
         *
         * const client = new AgentMailClient({
         *   environment: AgentMailEnvironment.ProdX402,
         *   x402,
         * });
         * ```
         */
        x402?: unknown;
    }

    export type RequestOptions = BaseRequestOptions;
}

export class AgentMailClient extends FernAgentMailClient {
    private readonly _x402Client?: unknown;

    constructor(options: AgentMailClient.Options = {}) {
        if (options.x402) {
            let wrappedFetch: typeof fetch | undefined;
            const x402Client = options.x402;

            super({
                apiKey: "",
                ...options,
                fetch: (async (input: RequestInfo | URL, init?: RequestInit) => {
                    if (!wrappedFetch) {
                        const { wrapFetchWithPayment } = await import("@x402/fetch");
                        wrappedFetch = wrapFetchWithPayment(fetch, x402Client as never);
                    }
                    return wrappedFetch(input, init);
                }) as typeof fetch,
            });

            this._x402Client = x402Client;
        } else {
            super(options);
        }
    }

    public get websockets(): WebsocketsClient {
        if (!this._websockets) {
            this._websockets = this._x402Client
                ? new X402WebsocketsClient(this._options, this._x402Client)
                : new WebsocketsClient(this._options);
        }
        return this._websockets;
    }
}
