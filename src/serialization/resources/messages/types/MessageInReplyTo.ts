/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as AgentMail from "../../../../api/index";
import * as core from "../../../../core";

export const MessageInReplyTo: core.serialization.Schema<serializers.MessageInReplyTo.Raw, AgentMail.MessageInReplyTo> =
    core.serialization.string();

export declare namespace MessageInReplyTo {
    export type Raw = string;
}
