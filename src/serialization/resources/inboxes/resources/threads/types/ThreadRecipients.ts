/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as AgentMail from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const ThreadRecipients: core.serialization.Schema<
    serializers.inboxes.ThreadRecipients.Raw,
    AgentMail.inboxes.ThreadRecipients
> = core.serialization.list(core.serialization.string());

export declare namespace ThreadRecipients {
    export type Raw = string[];
}
