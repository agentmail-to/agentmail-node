import { WebsocketsClient } from "../api/resources/websockets/client/Client.js";
import type { WebsocketsSocket } from "../api/resources/websockets/client/Socket.js";
import * as core from "../core/index.js";
import * as environments from "../environments.js";
import { type X402Initialized, getPaymentHeaders } from "./x402.js";

export class X402WebsocketsClient extends WebsocketsClient {
    private readonly _x402Init: Promise<X402Initialized>;

    constructor(options: WebsocketsClient.Options, x402Init: Promise<X402Initialized>) {
        super(options);
        this._x402Init = x402Init;
    }

    public async connect(args: WebsocketsClient.ConnectArgs = {}): Promise<WebsocketsSocket> {
        const x402 = await this._x402Init;

        const wsUrl = core.url.join(
            (await core.Supplier.get(this._options.baseUrl)) ??
                ((await core.Supplier.get(this._options.environment)) ?? environments.AgentMailEnvironment.Prod)
                    .websockets,
            "/v0",
        );

        console.log("[x402] Probing WS endpoint:", wsUrl);
        const paymentHeaders = await getPaymentHeaders(wsUrl, x402);
        console.log("[x402] Connecting WS with payment headers");

        return super.connect({
            ...args,
            headers: { ...paymentHeaders, ...args.headers },
            debug: true,
        });
    }
}
