import { AgentMailClient as FernAgentMailClient } from "../Client.js";
import type { BaseClientOptions, BaseRequestOptions } from "../BaseClient.js";
import { WebsocketsClient } from "../api/resources/websockets/client/Client.js";
import { X402WebsocketsClient } from "./X402WebsocketsClient.js";
import { initX402, type X402Initialized } from "./x402.js";

export declare namespace AgentMailClient {
    export interface Options extends BaseClientOptions {
        /**
         * An x402Client instance for automatic payment handling on all HTTP and WebSocket calls.
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
    private readonly _x402Init?: Promise<X402Initialized>;

    constructor(options: AgentMailClient.Options = {}) {
        if (options.x402) {
            const x402Init = initX402(options.x402);
            let resolvedFetch: typeof fetch | undefined;

            super({
                ...options,
                fetch: (async (input: RequestInfo | URL, init?: RequestInit) => {
                    resolvedFetch ??= (await x402Init).fetch;
                    return resolvedFetch(input, init);
                }) as typeof fetch,
            });

            this._x402Init = x402Init;
        } else {
            super(options);
        }
    }

    public get websockets(): WebsocketsClient {
        if (!this._websockets) {
            this._websockets = this._x402Init
                ? new X402WebsocketsClient(this._options, this._x402Init)
                : new WebsocketsClient(this._options);
        }
        return this._websockets;
    }
}
