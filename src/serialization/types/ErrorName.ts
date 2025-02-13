/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as AgentMailApi from "../../api/index";
import * as core from "../../core";

export const ErrorName: core.serialization.Schema<serializers.ErrorName.Raw, AgentMailApi.ErrorName> =
    core.serialization.string();

export declare namespace ErrorName {
    export type Raw = string;
}
