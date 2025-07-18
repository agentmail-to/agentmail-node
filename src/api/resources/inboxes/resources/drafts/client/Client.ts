/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../../../environments.js";
import * as core from "../../../../../../core/index.js";
import * as AgentMail from "../../../../../index.js";
import { toJson } from "../../../../../../core/json.js";
import { mergeHeaders, mergeOnlyDefinedHeaders } from "../../../../../../core/headers.js";
import * as errors from "../../../../../../errors/index.js";

export declare namespace Drafts {
    export interface Options {
        environment?: core.Supplier<environments.AgentMailEnvironment | environments.AgentMailEnvironmentUrls>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: core.Supplier<string>;
        apiKey?: core.Supplier<core.BearerToken | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | core.Supplier<string | undefined> | undefined>;
    }

    export interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | core.Supplier<string | undefined> | undefined>;
    }
}

export class Drafts {
    protected readonly _options: Drafts.Options;

    constructor(_options: Drafts.Options = {}) {
        this._options = _options;
    }

    /**
     * @param {AgentMail.inboxes.InboxId} inboxId
     * @param {AgentMail.inboxes.ListDraftsRequest} request
     * @param {Drafts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link AgentMail.NotFoundError}
     *
     * @example
     *     await client.inboxes.drafts.list("inbox_id")
     */
    public list(
        inboxId: AgentMail.inboxes.InboxId,
        request: AgentMail.inboxes.ListDraftsRequest = {},
        requestOptions?: Drafts.RequestOptions,
    ): core.HttpResponsePromise<AgentMail.ListDraftsResponse> {
        return core.HttpResponsePromise.fromPromise(this.__list(inboxId, request, requestOptions));
    }

    private async __list(
        inboxId: AgentMail.inboxes.InboxId,
        request: AgentMail.inboxes.ListDraftsRequest = {},
        requestOptions?: Drafts.RequestOptions,
    ): Promise<core.WithRawResponse<AgentMail.ListDraftsResponse>> {
        const { limit, page_token: pageToken, labels, ascending } = request;
        const _queryParams: Record<string, string | string[] | object | object[] | null> = {};
        if (limit != null) {
            _queryParams["limit"] = limit.toString();
        }

        if (pageToken != null) {
            _queryParams["page_token"] = pageToken;
        }

        if (labels != null) {
            _queryParams["labels"] = toJson(labels);
        }

        if (ascending != null) {
            _queryParams["ascending"] = ascending.toString();
        }

        const _response = await core.fetcher({
            url: core.url.join(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (
                        (await core.Supplier.get(this._options.environment)) ??
                        environments.AgentMailEnvironment.Production
                    ).http,
                `/v0/inboxes/${encodeURIComponent(inboxId)}/drafts`,
            ),
            method: "GET",
            headers: mergeHeaders(
                this._options?.headers,
                mergeOnlyDefinedHeaders({ Authorization: await this._getAuthorizationHeader() }),
                requestOptions?.headers,
            ),
            queryParameters: _queryParams,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return { data: _response.body as AgentMail.ListDraftsResponse, rawResponse: _response.rawResponse };
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 404:
                    throw new AgentMail.NotFoundError(
                        _response.error.body as AgentMail.ErrorResponse,
                        _response.rawResponse,
                    );
                default:
                    throw new errors.AgentMailError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                        rawResponse: _response.rawResponse,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.AgentMailError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                    rawResponse: _response.rawResponse,
                });
            case "timeout":
                throw new errors.AgentMailTimeoutError(
                    "Timeout exceeded when calling GET /v0/inboxes/{inbox_id}/drafts.",
                );
            case "unknown":
                throw new errors.AgentMailError({
                    message: _response.error.errorMessage,
                    rawResponse: _response.rawResponse,
                });
        }
    }

    /**
     * @param {AgentMail.inboxes.InboxId} inboxId
     * @param {AgentMail.DraftId} draftId
     * @param {Drafts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link AgentMail.NotFoundError}
     *
     * @example
     *     await client.inboxes.drafts.get("inbox_id", "draft_id")
     */
    public get(
        inboxId: AgentMail.inboxes.InboxId,
        draftId: AgentMail.DraftId,
        requestOptions?: Drafts.RequestOptions,
    ): core.HttpResponsePromise<AgentMail.Draft> {
        return core.HttpResponsePromise.fromPromise(this.__get(inboxId, draftId, requestOptions));
    }

    private async __get(
        inboxId: AgentMail.inboxes.InboxId,
        draftId: AgentMail.DraftId,
        requestOptions?: Drafts.RequestOptions,
    ): Promise<core.WithRawResponse<AgentMail.Draft>> {
        const _response = await core.fetcher({
            url: core.url.join(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (
                        (await core.Supplier.get(this._options.environment)) ??
                        environments.AgentMailEnvironment.Production
                    ).http,
                `/v0/inboxes/${encodeURIComponent(inboxId)}/drafts/${encodeURIComponent(draftId)}`,
            ),
            method: "GET",
            headers: mergeHeaders(
                this._options?.headers,
                mergeOnlyDefinedHeaders({ Authorization: await this._getAuthorizationHeader() }),
                requestOptions?.headers,
            ),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return { data: _response.body as AgentMail.Draft, rawResponse: _response.rawResponse };
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 404:
                    throw new AgentMail.NotFoundError(
                        _response.error.body as AgentMail.ErrorResponse,
                        _response.rawResponse,
                    );
                default:
                    throw new errors.AgentMailError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                        rawResponse: _response.rawResponse,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.AgentMailError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                    rawResponse: _response.rawResponse,
                });
            case "timeout":
                throw new errors.AgentMailTimeoutError(
                    "Timeout exceeded when calling GET /v0/inboxes/{inbox_id}/drafts/{draft_id}.",
                );
            case "unknown":
                throw new errors.AgentMailError({
                    message: _response.error.errorMessage,
                    rawResponse: _response.rawResponse,
                });
        }
    }

    /**
     * @param {AgentMail.inboxes.InboxId} inboxId
     * @param {AgentMail.CreateDraftRequest} request
     * @param {Drafts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link AgentMail.NotFoundError}
     *
     * @example
     *     await client.inboxes.drafts.create("inbox_id", {
     *         labels: undefined,
     *         reply_to: undefined,
     *         to: undefined,
     *         cc: undefined,
     *         bcc: undefined,
     *         subject: undefined,
     *         text: undefined,
     *         html: undefined
     *     })
     */
    public create(
        inboxId: AgentMail.inboxes.InboxId,
        request: AgentMail.CreateDraftRequest,
        requestOptions?: Drafts.RequestOptions,
    ): core.HttpResponsePromise<AgentMail.Draft> {
        return core.HttpResponsePromise.fromPromise(this.__create(inboxId, request, requestOptions));
    }

    private async __create(
        inboxId: AgentMail.inboxes.InboxId,
        request: AgentMail.CreateDraftRequest,
        requestOptions?: Drafts.RequestOptions,
    ): Promise<core.WithRawResponse<AgentMail.Draft>> {
        const _response = await core.fetcher({
            url: core.url.join(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (
                        (await core.Supplier.get(this._options.environment)) ??
                        environments.AgentMailEnvironment.Production
                    ).http,
                `/v0/inboxes/${encodeURIComponent(inboxId)}/drafts`,
            ),
            method: "POST",
            headers: mergeHeaders(
                this._options?.headers,
                mergeOnlyDefinedHeaders({ Authorization: await this._getAuthorizationHeader() }),
                requestOptions?.headers,
            ),
            contentType: "application/json",
            requestType: "json",
            body: request,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return { data: _response.body as AgentMail.Draft, rawResponse: _response.rawResponse };
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 404:
                    throw new AgentMail.NotFoundError(
                        _response.error.body as AgentMail.ErrorResponse,
                        _response.rawResponse,
                    );
                default:
                    throw new errors.AgentMailError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                        rawResponse: _response.rawResponse,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.AgentMailError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                    rawResponse: _response.rawResponse,
                });
            case "timeout":
                throw new errors.AgentMailTimeoutError(
                    "Timeout exceeded when calling POST /v0/inboxes/{inbox_id}/drafts.",
                );
            case "unknown":
                throw new errors.AgentMailError({
                    message: _response.error.errorMessage,
                    rawResponse: _response.rawResponse,
                });
        }
    }

    /**
     * @param {AgentMail.inboxes.InboxId} inboxId
     * @param {AgentMail.DraftId} draftId
     * @param {AgentMail.UpdateMessageRequest} request
     * @param {Drafts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link AgentMail.NotFoundError}
     * @throws {@link AgentMail.ValidationError}
     * @throws {@link AgentMail.MessageRejectedError}
     *
     * @example
     *     await client.inboxes.drafts.send("inbox_id", "draft_id", {
     *         add_labels: undefined,
     *         remove_labels: undefined
     *     })
     */
    public send(
        inboxId: AgentMail.inboxes.InboxId,
        draftId: AgentMail.DraftId,
        request: AgentMail.UpdateMessageRequest,
        requestOptions?: Drafts.RequestOptions,
    ): core.HttpResponsePromise<AgentMail.SendMessageResponse> {
        return core.HttpResponsePromise.fromPromise(this.__send(inboxId, draftId, request, requestOptions));
    }

    private async __send(
        inboxId: AgentMail.inboxes.InboxId,
        draftId: AgentMail.DraftId,
        request: AgentMail.UpdateMessageRequest,
        requestOptions?: Drafts.RequestOptions,
    ): Promise<core.WithRawResponse<AgentMail.SendMessageResponse>> {
        const _response = await core.fetcher({
            url: core.url.join(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (
                        (await core.Supplier.get(this._options.environment)) ??
                        environments.AgentMailEnvironment.Production
                    ).http,
                `/v0/inboxes/${encodeURIComponent(inboxId)}/drafts/${encodeURIComponent(draftId)}/send`,
            ),
            method: "POST",
            headers: mergeHeaders(
                this._options?.headers,
                mergeOnlyDefinedHeaders({ Authorization: await this._getAuthorizationHeader() }),
                requestOptions?.headers,
            ),
            contentType: "application/json",
            requestType: "json",
            body: request,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return { data: _response.body as AgentMail.SendMessageResponse, rawResponse: _response.rawResponse };
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 404:
                    throw new AgentMail.NotFoundError(
                        _response.error.body as AgentMail.ErrorResponse,
                        _response.rawResponse,
                    );
                case 400:
                    throw new AgentMail.ValidationError(
                        _response.error.body as AgentMail.ValidationErrorResponse,
                        _response.rawResponse,
                    );
                case 403:
                    throw new AgentMail.MessageRejectedError(
                        _response.error.body as AgentMail.ErrorResponse,
                        _response.rawResponse,
                    );
                default:
                    throw new errors.AgentMailError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                        rawResponse: _response.rawResponse,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.AgentMailError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                    rawResponse: _response.rawResponse,
                });
            case "timeout":
                throw new errors.AgentMailTimeoutError(
                    "Timeout exceeded when calling POST /v0/inboxes/{inbox_id}/drafts/{draft_id}/send.",
                );
            case "unknown":
                throw new errors.AgentMailError({
                    message: _response.error.errorMessage,
                    rawResponse: _response.rawResponse,
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
