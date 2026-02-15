import { AgentMailClient as FernAgentMailClient } from "../Client.js";
import type { BaseClientOptions, BaseRequestOptions } from "../BaseClient.js";
import { WebsocketsClient } from "../api/resources/websockets/client/Client.js";
import { X402WebsocketsClient } from "./X402WebsocketsClient.js";

export declare namespace AgentMailClient {
    export interface Options extends BaseClientOptions {
        /**
         * An x402Client instance for automatic payment handling on WebSocket connections.
         * For HTTP, pass a wrapped fetch via the `fetch` option instead.
         *
         * @example
         * ```typescript
         * import { x402Client, wrapFetchWithPayment } from "@x402/fetch";
         * import { registerExactEvmScheme } from "@x402/evm/exact/client";
         * import { privateKeyToAccount } from "viem/accounts";
         *
         * const x402 = new x402Client();
         * registerExactEvmScheme(x402, { signer: privateKeyToAccount("0x...") });
         *
         * const client = new AgentMailClient({
         *   environment: AgentMailEnvironment.ProdX402,
         *   fetch: wrapFetchWithPayment(fetch, x402),
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
        super(options);
        if (options.x402) {
            this._x402Client = options.x402;
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
