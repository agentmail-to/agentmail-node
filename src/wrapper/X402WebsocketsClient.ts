import { WebsocketsClient } from "../api/resources/websockets/client/Client.js";
import type { WebsocketsSocket } from "../api/resources/websockets/client/Socket.js";
import * as core from "../core/index.js";
import * as environments from "../environments.js";
import { getPaymentHeaders } from "./x402.js";

export class X402WebsocketsClient extends WebsocketsClient {
    private readonly _x402Client: unknown;

    constructor(options: WebsocketsClient.Options, x402Client: unknown) {
        super(options);
        this._x402Client = x402Client;
    }

    public async connect(args: WebsocketsClient.ConnectArgs = {}): Promise<WebsocketsSocket> {
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
}
