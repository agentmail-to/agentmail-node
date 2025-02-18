/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as AgentMail from "../../../../api/index";
import * as core from "../../../../core";

export const ThreadUpdatedAt: core.serialization.Schema<serializers.ThreadUpdatedAt.Raw, AgentMail.ThreadUpdatedAt> =
    core.serialization.date();

export declare namespace ThreadUpdatedAt {
    export type Raw = string;
}
