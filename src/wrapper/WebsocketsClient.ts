import { WebsocketsClient as FernWebsocketsClient } from "../api/resources/websockets/client/Client.js";
import type { WebsocketsSocket } from "../api/resources/websockets/client/Socket.js";
import * as core from "../core/index.js";
import * as environments from "../environments.js";

export type GetPaymentCredentials = (wsUrl: string) => Promise<Record<string, string>>;

export class WebsocketsClient extends FernWebsocketsClient {
    private readonly _getPaymentCredentials: GetPaymentCredentials | undefined;

    constructor(options: FernWebsocketsClient.Options, getPaymentCredentials?: GetPaymentCredentials) {
        super(options);
        this._getPaymentCredentials = getPaymentCredentials;
    }

    public override async connect(args: FernWebsocketsClient.ConnectArgs = {}): Promise<WebsocketsSocket> {
        if (this._getPaymentCredentials) {
            const wsUrl = core.url.join(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    ((await core.Supplier.get(this._options.environment)) ?? environments.AgentMailEnvironment.Prod)
                        .websockets,
                "/v0",
            );
            const credentials = await this._getPaymentCredentials(wsUrl);
            return super.connect({
                ...args,
                queryParams: { ...credentials, ...args.queryParams },
            });
        }

        if (!args.apiKey) {
            const apiKey = (await core.Supplier.get(this._options.apiKey)) ?? process.env.AGENTMAIL_API_KEY;
            return super.connect({ ...args, apiKey });
        }

        return super.connect(args);
    }
}
