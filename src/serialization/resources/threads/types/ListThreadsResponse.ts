/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as AgentMail from "../../../../api/index";
import * as core from "../../../../core";
import { Count } from "../../../types/Count";
import { Limit } from "../../../types/Limit";
import { PageToken } from "../../../types/PageToken";
import { ThreadItem } from "./ThreadItem";

export const ListThreadsResponse: core.serialization.ObjectSchema<
    serializers.ListThreadsResponse.Raw,
    AgentMail.ListThreadsResponse
> = core.serialization.object({
    count: Count,
    limit: Limit.optional(),
    nextPageToken: core.serialization.property("next_page_token", PageToken.optional()),
    threads: core.serialization.list(ThreadItem),
});

export declare namespace ListThreadsResponse {
    export interface Raw {
        count: Count.Raw;
        limit?: Limit.Raw | null;
        next_page_token?: PageToken.Raw | null;
        threads: ThreadItem.Raw[];
    }
}
