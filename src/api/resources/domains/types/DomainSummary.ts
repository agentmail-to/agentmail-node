/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as AgentMail from "../../../index.js";

export interface DomainSummary {
    domain_id: AgentMail.DomainId;
    organization_id: AgentMail.OrganizationId;
    /** Time at which the domain was last updated. */
    updated_at: string;
    /** Time at which the domain was created. */
    created_at: string;
    /** Whether to forward bounce and complaint notifications to your domain. */
    feedback_enabled?: boolean;
}
