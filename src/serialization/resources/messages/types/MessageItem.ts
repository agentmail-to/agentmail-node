/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as AgentMail from "../../../../api/index";
import * as core from "../../../../core";
import { ThreadId } from "../../threads/types/ThreadId";
import { MessageId } from "./MessageId";
import { MessageEventId } from "./MessageEventId";
import { MessageLabels } from "./MessageLabels";
import { MessageTimestamp } from "./MessageTimestamp";
import { MessageFrom } from "./MessageFrom";
import { MessageTo } from "./MessageTo";
import { MessageCc } from "./MessageCc";
import { MessageBcc } from "./MessageBcc";
import { MessageSubject } from "./MessageSubject";
import { MessagePreview } from "./MessagePreview";
import { MessageAttachments } from "./MessageAttachments";
import { Attachment } from "./Attachment";

export const MessageItem: core.serialization.ObjectSchema<serializers.MessageItem.Raw, AgentMail.MessageItem> =
    core.serialization.object({
        threadId: core.serialization.property("thread_id", ThreadId),
        messageId: core.serialization.property("message_id", MessageId),
        eventId: core.serialization.property("event_id", MessageEventId),
        labels: MessageLabels,
        timestamp: MessageTimestamp,
        from: MessageFrom,
        to: MessageTo,
        cc: MessageCc.optional(),
        bcc: MessageBcc.optional(),
        subject: MessageSubject.optional(),
        preview: MessagePreview.optional(),
        attachments: MessageAttachments.optional(),
    });

export declare namespace MessageItem {
    export interface Raw {
        thread_id: ThreadId.Raw;
        message_id: MessageId.Raw;
        event_id: MessageEventId.Raw;
        labels: MessageLabels.Raw;
        timestamp: MessageTimestamp.Raw;
        from: MessageFrom.Raw;
        to: MessageTo.Raw;
        cc?: MessageCc.Raw | null;
        bcc?: MessageBcc.Raw | null;
        subject?: MessageSubject.Raw | null;
        preview?: MessagePreview.Raw | null;
        attachments?: MessageAttachments.Raw | null;
    }
}
