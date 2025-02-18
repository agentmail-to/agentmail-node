/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as AgentMail from "../../../../api/index";
import * as core from "../../../../core";

export const MessageSentAt: core.serialization.Schema<serializers.MessageSentAt.Raw, AgentMail.MessageSentAt> =
    core.serialization.date();

export declare namespace MessageSentAt {
    export type Raw = string;
}
