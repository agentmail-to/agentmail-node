/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as AgentmailApi from "../../../../api/index";
import * as core from "../../../../core";
import { MessageId } from "./MessageId";
import { ThreadId } from "../../threads/types/ThreadId";
import { MessageSentAt } from "./MessageSentAt";
import { MessageFrom } from "./MessageFrom";
import { MessageSubject } from "./MessageSubject";
import { MessagePreview } from "./MessagePreview";
import { MessageTo } from "./MessageTo";
import { MessageCc } from "./MessageCc";
import { MessageBcc } from "./MessageBcc";
import { MessageAttachments } from "./MessageAttachments";
import { Attachment } from "./Attachment";

export const MessageItem: core.serialization.ObjectSchema<serializers.MessageItem.Raw, AgentmailApi.MessageItem> =
    core.serialization.object({
        messageId: core.serialization.property("message_id", MessageId),
        threadId: core.serialization.property("thread_id", ThreadId),
        sentAt: core.serialization.property("sent_at", MessageSentAt),
        from: MessageFrom,
        subject: MessageSubject,
        preview: MessagePreview,
        to: MessageTo,
        cc: MessageCc,
        bcc: MessageBcc,
        attachments: MessageAttachments,
    });

export declare namespace MessageItem {
    export interface Raw {
        message_id: MessageId.Raw;
        thread_id: ThreadId.Raw;
        sent_at: MessageSentAt.Raw;
        from: MessageFrom.Raw;
        subject?: MessageSubject.Raw;
        preview?: MessagePreview.Raw;
        to: MessageTo.Raw;
        cc?: MessageCc.Raw;
        bcc?: MessageBcc.Raw;
        attachments?: MessageAttachments.Raw;
    }
}
