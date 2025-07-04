/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as AgentMail from "../../../../api/index";
import * as core from "../../../../core";
import { InboxId } from "../../inboxes/types/InboxId";
import { ThreadId } from "../../threads/types/ThreadId";
import { DraftId } from "./DraftId";
import { DraftLabels } from "./DraftLabels";
import { DraftTo } from "./DraftTo";
import { DraftCc } from "./DraftCc";
import { DraftBcc } from "./DraftBcc";
import { DraftSubject } from "./DraftSubject";
import { DraftPreview } from "./DraftPreview";
import { DraftAttachments } from "./DraftAttachments";
import { DraftUpdatedAt } from "./DraftUpdatedAt";
import { Attachment } from "../../attachments/types/Attachment";

export const DraftItem: core.serialization.ObjectSchema<serializers.DraftItem.Raw, AgentMail.DraftItem> =
    core.serialization.object({
        inboxId: core.serialization.property("inbox_id", InboxId),
        threadId: core.serialization.property("thread_id", ThreadId),
        draftId: core.serialization.property("draft_id", DraftId),
        labels: DraftLabels,
        to: DraftTo.optional(),
        cc: DraftCc.optional(),
        bcc: DraftBcc.optional(),
        subject: DraftSubject.optional(),
        preview: DraftPreview.optional(),
        attachments: DraftAttachments.optional(),
        updatedAt: core.serialization.property("updated_at", DraftUpdatedAt),
    });

export declare namespace DraftItem {
    export interface Raw {
        inbox_id: InboxId.Raw;
        thread_id: ThreadId.Raw;
        draft_id: DraftId.Raw;
        labels: DraftLabels.Raw;
        to?: DraftTo.Raw | null;
        cc?: DraftCc.Raw | null;
        bcc?: DraftBcc.Raw | null;
        subject?: DraftSubject.Raw | null;
        preview?: DraftPreview.Raw | null;
        attachments?: DraftAttachments.Raw | null;
        updated_at: DraftUpdatedAt.Raw;
    }
}
