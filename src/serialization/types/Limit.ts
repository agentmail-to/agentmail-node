/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as AgentMail from "../../api/index";
import * as core from "../../core";

export const Limit: core.serialization.Schema<serializers.Limit.Raw, AgentMail.Limit> = core.serialization.number();

export declare namespace Limit {
    export type Raw = number;
}
