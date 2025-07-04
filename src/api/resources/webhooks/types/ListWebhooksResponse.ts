/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as AgentMail from "../../../index";

export interface ListWebhooksResponse {
    count: AgentMail.Count;
    limit?: AgentMail.Limit;
    nextPageToken?: AgentMail.PageToken;
    /** Ordered by `created_at` descending. */
    webhooks: AgentMail.Webhook[];
}
