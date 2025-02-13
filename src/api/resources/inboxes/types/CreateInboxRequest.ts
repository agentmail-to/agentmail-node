/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as AgentMailApi from "../../../index";

/**
 * @example
 *     {
 *         username: "yourinbox",
 *         displayName: "Your Inbox"
 *     }
 *
 * @example
 *     {
 *         domain: "yourdomain.com"
 *     }
 */
export interface CreateInboxRequest {
    /** Username of address. Randomly generated if not specified. */
    username?: string;
    /** Domain of address. Must be verified domain. Defaults to `agentmail.to`. */
    domain?: string;
    displayName?: AgentMailApi.DisplayName;
}
