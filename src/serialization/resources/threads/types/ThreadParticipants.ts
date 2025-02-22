/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as AgentMail from "../../../../api/index";
import * as core from "../../../../core";

export const ThreadParticipants: core.serialization.Schema<
    serializers.ThreadParticipants.Raw,
    AgentMail.ThreadParticipants
> = core.serialization.list(core.serialization.string());

export declare namespace ThreadParticipants {
    export type Raw = string[];
}
