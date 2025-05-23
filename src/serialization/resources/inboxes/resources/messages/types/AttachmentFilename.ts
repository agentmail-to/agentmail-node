/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as AgentMail from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const AttachmentFilename: core.serialization.Schema<
    serializers.inboxes.AttachmentFilename.Raw,
    AgentMail.inboxes.AttachmentFilename
> = core.serialization.string();

export declare namespace AttachmentFilename {
    export type Raw = string;
}
