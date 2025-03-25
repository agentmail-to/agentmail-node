/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as AgentMail from "../../../../api/index";
import * as core from "../../../../core";

export const WebhookId: core.serialization.Schema<serializers.WebhookId.Raw, AgentMail.WebhookId> =
    core.serialization.string();

export declare namespace WebhookId {
    export type Raw = string;
}
