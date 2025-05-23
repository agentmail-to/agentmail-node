/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as AgentMail from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const MessageText: core.serialization.Schema<
    serializers.inboxes.MessageText.Raw,
    AgentMail.inboxes.MessageText
> = core.serialization.string();

export declare namespace MessageText {
    export type Raw = string;
}
