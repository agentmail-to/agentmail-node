/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as AgentMail from "../../../../api/index";
import * as core from "../../../../core";
import { AttachmentId } from "../../messages/types/AttachmentId";
import { AttachmentFilename } from "../../messages/types/AttachmentFilename";
import { AttachmentContentType } from "../../messages/types/AttachmentContentType";
import { AttachmentSize } from "../../messages/types/AttachmentSize";
import { AttachmentInline } from "../../messages/types/AttachmentInline";

export const ThreadAttachment: core.serialization.ObjectSchema<
    serializers.ThreadAttachment.Raw,
    AgentMail.ThreadAttachment
> = core.serialization.object({
    messageId: core.serialization.property("message_id", core.serialization.string()),
    attachmentId: core.serialization.property("attachment_id", AttachmentId),
    filename: AttachmentFilename,
    contentType: core.serialization.property("content_type", AttachmentContentType),
    size: AttachmentSize,
    inline: AttachmentInline,
});

export declare namespace ThreadAttachment {
    export interface Raw {
        message_id: string;
        attachment_id: AttachmentId.Raw;
        filename: AttachmentFilename.Raw;
        content_type: AttachmentContentType.Raw;
        size: AttachmentSize.Raw;
        inline: AttachmentInline.Raw;
    }
}
