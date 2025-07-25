/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as AgentMail from "../../../index.js";

export interface ListDomainsResponse {
    count: AgentMail.Count;
    next_page_token?: AgentMail.PageToken;
    /** Ordered by `created_at` descending. */
    domains: AgentMail.DomainSummary[];
}
