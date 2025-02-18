/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as AgentMail from "../../../../api/index";
import * as core from "../../../../core";

export const MessagePreview: core.serialization.Schema<serializers.MessagePreview.Raw, AgentMail.MessagePreview> =
    core.serialization.string().optional();

export declare namespace MessagePreview {
    export type Raw = string | null | undefined;
}
