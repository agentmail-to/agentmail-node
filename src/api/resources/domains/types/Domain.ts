/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as AgentMail from "../../../index.js";

export interface Domain {
    domain_id: AgentMail.DomainId;
    organization_id: AgentMail.OrganizationId;
    /** The verification status of the domain. */
    status: AgentMail.VerificationStatus;
    /** Whether bounce and complaint notifications are forwarded to your domain. */
    feedback_enabled?: boolean;
    /** A list of DNS records required to verify the domain. */
    records: AgentMail.VerificationRecord[];
    /** Time at which the domain was last updated. */
    updated_at: string;
    /** Time at which the domain was created. */
    created_at: string;
}
