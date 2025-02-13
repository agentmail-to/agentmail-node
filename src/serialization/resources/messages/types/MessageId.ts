/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as AgentMailApi from "../../../../api/index";
import * as core from "../../../../core";

export const MessageId: core.serialization.Schema<serializers.MessageId.Raw, AgentMailApi.MessageId> =
    core.serialization.string();

export declare namespace MessageId {
    export type Raw = string;
}
