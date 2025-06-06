/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as AgentMail from "../../../../api/index";
import * as core from "../../../../core";

export const DraftCc: core.serialization.Schema<serializers.DraftCc.Raw, AgentMail.DraftCc> = core.serialization.list(
    core.serialization.string(),
);

export declare namespace DraftCc {
    export type Raw = string[];
}
