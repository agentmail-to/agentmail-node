/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "./environments";
import * as core from "./core";
import { Inboxes } from "./api/resources/inboxes/client/Client";
import { Threads } from "./api/resources/threads/client/Client";
import { Messages } from "./api/resources/messages/client/Client";

export declare namespace AgentMailApiClient {
    export interface Options {
        environment?: core.Supplier<environments.AgentMailApiEnvironment | string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: core.Supplier<string>;
        apiKey?: core.Supplier<core.BearerToken | undefined>;
    }

    export interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Additional headers to include in the request. */
        headers?: Record<string, string>;
    }
}

export class AgentMailApiClient {
    protected _inboxes: Inboxes | undefined;
    protected _threads: Threads | undefined;
    protected _messages: Messages | undefined;

    constructor(protected readonly _options: AgentMailApiClient.Options = {}) {}

    public get inboxes(): Inboxes {
        return (this._inboxes ??= new Inboxes(this._options));
    }

    public get threads(): Threads {
        return (this._threads ??= new Threads(this._options));
    }

    public get messages(): Messages {
        return (this._messages ??= new Messages(this._options));
    }
}
