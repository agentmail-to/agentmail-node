/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as AgentMail from "../../../index.js";

export interface Message {
    inbox_id: AgentMail.inboxes.InboxId;
    thread_id: AgentMail.ThreadId;
    message_id: AgentMail.MessageId;
    labels: AgentMail.MessageLabels;
    timestamp: AgentMail.MessageTimestamp;
    from: AgentMail.MessageFrom;
    /** Reply-to addresses. In format `username@domain.com` or `Display Name <username@domain.com>`. */
    reply_to?: string[];
    to: AgentMail.MessageTo;
    cc?: AgentMail.MessageCc;
    bcc?: AgentMail.MessageBcc;
    subject?: AgentMail.MessageSubject;
    preview?: AgentMail.MessagePreview;
    text?: AgentMail.MessageText;
    html?: AgentMail.MessageHtml;
    attachments?: AgentMail.MessageAttachments;
    /** ID of message being replied to. */
    in_reply_to?: string;
    /** IDs of previous messages in thread. */
    references?: string[];
    /** Time at which message was last updated. */
    updated_at: string;
    /** Time at which message was created. */
    created_at: string;
}
