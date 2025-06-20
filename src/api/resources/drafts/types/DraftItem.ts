/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as AgentMail from "../../../index";

export interface DraftItem {
    inboxId: AgentMail.inboxes.InboxId;
    threadId: AgentMail.ThreadId;
    draftId: AgentMail.DraftId;
    labels: AgentMail.DraftLabels;
    to?: AgentMail.DraftTo;
    cc?: AgentMail.DraftCc;
    bcc?: AgentMail.DraftBcc;
    subject?: AgentMail.DraftSubject;
    preview?: AgentMail.DraftPreview;
    attachments?: AgentMail.DraftAttachments;
    updatedAt: AgentMail.DraftUpdatedAt;
}
