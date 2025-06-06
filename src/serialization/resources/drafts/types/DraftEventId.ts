/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as AgentMail from "../../../../api/index";
import * as core from "../../../../core";

export const DraftEventId: core.serialization.Schema<serializers.DraftEventId.Raw, AgentMail.DraftEventId> =
    core.serialization.string();

export declare namespace DraftEventId {
    export type Raw = string;
}
