/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as AgentMailApi from "../../api/index";
import * as core from "../../core";
import { ErrorName } from "./ErrorName";

export const ErrorResponse: core.serialization.ObjectSchema<serializers.ErrorResponse.Raw, AgentMailApi.ErrorResponse> =
    core.serialization.object({
        name: ErrorName,
        message: core.serialization.string(),
    });

export declare namespace ErrorResponse {
    export interface Raw {
        name: ErrorName.Raw;
        message: string;
    }
}
