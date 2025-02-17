/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as AgentmailApi from "../../api/index";
import * as core from "../../core";

export const Count: core.serialization.Schema<serializers.Count.Raw, AgentmailApi.Count> = core.serialization.number();

export declare namespace Count {
    export type Raw = number;
}
