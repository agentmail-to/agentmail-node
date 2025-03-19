/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../environments";
import * as core from "../../../../core";
import * as AgentMail from "../../../index";
import * as serializers from "../../../../serialization/index";
import urlJoin from "url-join";
import * as errors from "../../../../errors/index";

export declare namespace Threads {
    export interface Options {
        environment?: core.Supplier<environments.AgentMailEnvironment | string>;
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

export class Threads {
    constructor(protected readonly _options: Threads.Options = {}) {}

    /**
     * @param {AgentMail.InboxId} inboxId
     * @param {AgentMail.ListThreadsRequest} request
     * @param {Threads.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link AgentMail.NotFoundError}
     *
     * @example
     *     await client.threads.list("yourinbox@agentmail.to", {
     *         limit: 10
     *     })
     */
    public async list(
        inboxId: AgentMail.InboxId,
        request: AgentMail.ListThreadsRequest = {},
        requestOptions?: Threads.RequestOptions,
    ): Promise<AgentMail.ListThreadsResponse> {
        const { received, sent, limit, lastKey } = request;
        const _queryParams: Record<string, string | string[] | object | object[] | null> = {};
        if (received != null) {
            _queryParams["received"] = received.toString();
        }

        if (sent != null) {
            _queryParams["sent"] = sent.toString();
        }

        if (limit != null) {
            _queryParams["limit"] = limit.toString();
        }

        if (lastKey != null) {
            _queryParams["last_key"] = lastKey;
        }

        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)) ??
                    environments.AgentMailEnvironment.Production,
                `/v0/inboxes/${encodeURIComponent(serializers.InboxId.jsonOrThrow(inboxId))}/threads`,
            ),
            method: "GET",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "agentmail",
                "X-Fern-SDK-Version": "0.0.21",
                "User-Agent": "agentmail/0.0.21",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            queryParameters: _queryParams,
            requestType: "json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.ListThreadsResponse.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 404:
                    throw new AgentMail.NotFoundError(
                        serializers.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        }),
                    );
                default:
                    throw new errors.AgentMailError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.AgentMailError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.AgentMailTimeoutError(
                    "Timeout exceeded when calling GET /v0/inboxes/{inbox_id}/threads.",
                );
            case "unknown":
                throw new errors.AgentMailError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * @param {AgentMail.InboxId} inboxId
     * @param {AgentMail.ThreadId} threadId
     * @param {Threads.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link AgentMail.NotFoundError}
     *
     * @example
     *     await client.threads.get("yourinbox@agentmail.to", "thread_123")
     */
    public async get(
        inboxId: AgentMail.InboxId,
        threadId: AgentMail.ThreadId,
        requestOptions?: Threads.RequestOptions,
    ): Promise<AgentMail.Thread> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)) ??
                    environments.AgentMailEnvironment.Production,
                `/v0/inboxes/${encodeURIComponent(serializers.InboxId.jsonOrThrow(inboxId))}/threads/${encodeURIComponent(serializers.ThreadId.jsonOrThrow(threadId))}`,
            ),
            method: "GET",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "agentmail",
                "X-Fern-SDK-Version": "0.0.21",
                "User-Agent": "agentmail/0.0.21",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.Thread.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 404:
                    throw new AgentMail.NotFoundError(
                        serializers.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        }),
                    );
                default:
                    throw new errors.AgentMailError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.AgentMailError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.AgentMailTimeoutError(
                    "Timeout exceeded when calling GET /v0/inboxes/{inbox_id}/threads/{thread_id}.",
                );
            case "unknown":
                throw new errors.AgentMailError({
                    message: _response.error.errorMessage,
                });
        }
    }

    protected async _getAuthorizationHeader(): Promise<string> {
        const bearer = (await core.Supplier.get(this._options.apiKey)) ?? process?.env["AGENTMAIL_API_KEY"];
        if (bearer == null) {
            throw new errors.AgentMailError({
                message:
                    "Please specify a bearer by either passing it in to the constructor or initializing a AGENTMAIL_API_KEY environment variable",
            });
        }

        return `Bearer ${bearer}`;
    }
}
