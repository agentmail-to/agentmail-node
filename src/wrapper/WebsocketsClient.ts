import { WebsocketsClient as FernWebsocketsClient } from "../api/resources/websockets/client/Client.js";
import type { WebsocketsSocket } from "../api/resources/websockets/client/Socket.js";
import * as core from "../core/index.js";
import * as environments from "../environments.js";
import { SDK_VERSION } from "../version.js";
import { DEFAULT_RECONNECT_POLICY, enableAutoReconnect, type ReconnectPolicy } from "./reconnect.js";

export type GetPaymentCredentials = (wsUrl: string) => Promise<Record<string, string>>;

// The generated client's default. Always passed explicitly: auto-reconnect has to know the generated
// socket's exact retry budget to take over before it runs out.
const DEFAULT_RECONNECT_ATTEMPTS = 30;

// Lets the server tell SDK releases apart on the handshake (Node only; browsers cannot set handshake
// headers). Caller-supplied headers win.
const SDK_HEADERS = { "X-Fern-SDK-Name": "agentmail", "X-Fern-SDK-Version": SDK_VERSION };

export class WebsocketsClient extends FernWebsocketsClient {
    private readonly _getPaymentCredentials: GetPaymentCredentials | undefined;
    private readonly _reconnectPolicy: ReconnectPolicy;

    constructor(
        options: FernWebsocketsClient.Options,
        getPaymentCredentials?: GetPaymentCredentials,
        reconnectPolicy: ReconnectPolicy = DEFAULT_RECONNECT_POLICY,
    ) {
        super(options);
        this._getPaymentCredentials = getPaymentCredentials;
        this._reconnectPolicy = reconnectPolicy;
    }

    public override async connect(
        args: FernWebsocketsClient.ConnectArgs & {
            /** Resolve only once the connection is open. Defaults to true. */
            waitForOpen?: boolean;
            /**
             * Keep the socket connected and subscribed. Whenever the connection drops, reconnect with
             * exponential backoff (full jitter, 1 s doubling up to 60 s) and re-send every subscription
             * sent through `sendSubscribe` on the new connection; `reconnectAttempts` then only bounds
             * the generated socket's own quick retries, not the total. Stops on `close()`, on
             * `abortSignal`, or when the server refuses the handshake with 401, 402 or 403, which is
             * reported to the `error` handler. x402/MPP sockets reuse the payment credential minted by
             * this call on every reconnect. Defaults to true. `false` (or `reconnectAttempts: 0`) keeps
             * only the generated socket's own limited retries and does not re-subscribe.
             */
            autoReconnect?: boolean;
        } = {},
    ): Promise<WebsocketsSocket> {
        const { waitForOpen = true, autoReconnect = true, ...rest } = args;
        const reconnectAttempts = rest.reconnectAttempts ?? DEFAULT_RECONNECT_ATTEMPTS;
        let connectArgs: FernWebsocketsClient.ConnectArgs = {
            ...rest,
            reconnectAttempts,
            headers: { ...SDK_HEADERS, ...rest.headers },
        };

        if (this._getPaymentCredentials) {
            const wsUrl = core.url.join(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    ((await core.Supplier.get(this._options.environment)) ?? environments.AgentMailEnvironment.Prod)
                        .websockets,
                "/v0",
            );
            const credentials = await this._getPaymentCredentials(wsUrl);
            connectArgs = {
                ...connectArgs,
                queryParams: { ...credentials, ...rest.queryParams },
            };
        } else if (!rest.apiKey) {
            const apiKey = (await core.Supplier.get(this._options.apiKey)) ?? process.env.AGENTMAIL_API_KEY;
            connectArgs = { ...connectArgs, apiKey };
        }

        const socket = await super.connect(connectArgs);
        if (waitForOpen) await socket.waitForOpen();
        if (autoReconnect && reconnectAttempts > 0) {
            enableAutoReconnect(socket, {
                maxRetries: reconnectAttempts,
                abortSignal: rest.abortSignal,
                policy: this._reconnectPolicy,
            });
        }
        return socket;
    }
}
