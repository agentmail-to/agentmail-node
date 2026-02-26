import type { x402Client } from "@x402/fetch";
import { WebsocketsClient as FernWebsocketsClient } from "../api/resources/websockets/client/Client.js";
import type { WebsocketsSocket } from "../api/resources/websockets/client/Socket.js";
import * as core from "../core/index.js";
import * as environments from "../environments.js";
import { getPaymentHeaders } from "./x402.js";

export class WebsocketsClient extends FernWebsocketsClient {
    private readonly _x402Client: x402Client | undefined;

    constructor(options: FernWebsocketsClient.Options, x402Client?: x402Client) {
        super(options);
        this._x402Client = x402Client;
    }

    public override async connect(args: FernWebsocketsClient.ConnectArgs = {}): Promise<WebsocketsSocket> {
        if (this._x402Client) {
            const wsUrl = core.url.join(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    ((await core.Supplier.get(this._options.environment)) ?? environments.AgentMailEnvironment.Prod)
                        .websockets,
                "/v0",
            );

            const paymentHeaders = await getPaymentHeaders(wsUrl, this._x402Client);

            return super.connect({
                ...args,
                headers: { ...paymentHeaders, ...args.headers },
            });
        }

        if (!args.apiKey) {
            const apiKey = (await core.Supplier.get(this._options.apiKey)) ?? process.env.AGENTMAIL_API_KEY;
            return super.connect({ ...args, apiKey });
        }

        return super.connect(args);
    }
}
