/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as AgentMail from "../../../../api/index";
import * as core from "../../../../core";

export const MessageThreadId: core.serialization.Schema<serializers.MessageThreadId.Raw, AgentMail.MessageThreadId> =
    core.serialization.string();

export declare namespace MessageThreadId {
    export type Raw = string;
}
