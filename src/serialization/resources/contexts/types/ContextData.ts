/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as AgentMail from "../../../../api/index";
import * as core from "../../../../core";

export const ContextData: core.serialization.Schema<serializers.ContextData.Raw, AgentMail.ContextData> =
    core.serialization.record(core.serialization.string(), core.serialization.unknown());

export declare namespace ContextData {
    export type Raw = Record<string, unknown>;
}
