/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as AgentMail from "../../../../api/index";
import * as core from "../../../../core";
import { ThreadId } from "./ThreadId";
import { InboxId } from "../../inboxes/types/InboxId";
import { ThreadUpdatedAt } from "./ThreadUpdatedAt";
import { ThreadParticipants } from "./ThreadParticipants";
import { ThreadMessageCount } from "./ThreadMessageCount";
import { Message } from "../../messages/types/Message";
import { ThreadSubject } from "./ThreadSubject";
import { ThreadPreview } from "./ThreadPreview";
import { ThreadAttachments } from "./ThreadAttachments";
import { ThreadAttachment } from "./ThreadAttachment";

export const Thread: core.serialization.ObjectSchema<serializers.Thread.Raw, AgentMail.Thread> =
    core.serialization.object({
        threadId: core.serialization.property("thread_id", ThreadId),
        inboxId: core.serialization.property("inbox_id", InboxId),
        createdAt: core.serialization.property("created_at", core.serialization.date()),
        updatedAt: core.serialization.property("updated_at", ThreadUpdatedAt),
        participants: ThreadParticipants,
        messageCount: core.serialization.property("message_count", ThreadMessageCount),
        messages: core.serialization.list(Message),
        subject: ThreadSubject.optional(),
        preview: ThreadPreview.optional(),
        attachments: ThreadAttachments.optional(),
    });

export declare namespace Thread {
    export interface Raw {
        thread_id: ThreadId.Raw;
        inbox_id: InboxId.Raw;
        created_at: string;
        updated_at: ThreadUpdatedAt.Raw;
        participants: ThreadParticipants.Raw;
        message_count: ThreadMessageCount.Raw;
        messages: Message.Raw[];
        subject?: ThreadSubject.Raw | null;
        preview?: ThreadPreview.Raw | null;
        attachments?: ThreadAttachments.Raw | null;
    }
}
