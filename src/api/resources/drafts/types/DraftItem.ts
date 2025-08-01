/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as AgentMail from "../../../index.js";

export interface DraftItem {
    inbox_id: AgentMail.inboxes.InboxId;
    thread_id: AgentMail.ThreadId;
    draft_id: AgentMail.DraftId;
    labels: AgentMail.DraftLabels;
    to?: AgentMail.DraftTo;
    cc?: AgentMail.DraftCc;
    bcc?: AgentMail.DraftBcc;
    subject?: AgentMail.DraftSubject;
    preview?: AgentMail.DraftPreview;
    attachments?: AgentMail.DraftAttachments;
    updated_at: AgentMail.DraftUpdatedAt;
}
