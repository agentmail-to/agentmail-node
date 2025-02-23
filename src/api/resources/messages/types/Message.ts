/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as AgentMail from "../../../index";

/**
 * @example
 *     {
 *         messageId: "msg_123",
 *         threadId: "thread_123",
 *         sentAt: "2024-01-15T09:30:00Z",
 *         receivedAt: "2024-01-15T09:30:00Z",
 *         from: "alice@example.com",
 *         replyTo: "alice.work@example.com",
 *         to: ["bob@example.com"],
 *         cc: ["charlie@example.com"],
 *         bcc: ["david@example.com"],
 *         subject: "Project Discussion",
 *         preview: "Let's review the timeline for the project.",
 *         text: "Let's review the timeline for the project. How does tomorrow look?",
 *         html: "<p>Let's review the timeline for the project. How does tomorrow look?</p>",
 *         attachments: [{
 *                 attachmentId: "att_123",
 *                 filename: "proposal.pdf",
 *                 contentType: "application/pdf",
 *                 size: 1024,
 *                 inline: false
 *             }],
 *         inReplyTo: "msg_122",
 *         references: ["msg_121", "msg_122"]
 *     }
 */
export interface Message {
    messageId: AgentMail.MessageId;
    threadId: AgentMail.MessageThreadId;
    sentAt: AgentMail.MessageSentAt;
    /** Time at which message was received. */
    receivedAt?: Date;
    from: AgentMail.MessageFrom;
    /** Address to reply to. In format `username@domain.com` or `Display Name <username@domain.com>`. */
    replyTo?: string;
    subject?: AgentMail.MessageSubject;
    preview?: AgentMail.MessagePreview;
    to: AgentMail.MessageTo;
    cc?: AgentMail.MessageCc;
    bcc?: AgentMail.MessageBcc;
    text?: AgentMail.MessageText;
    html?: AgentMail.MessageHtml;
    attachments?: AgentMail.MessageAttachments;
    /** ID of message being replied to. */
    inReplyTo?: string;
    /** IDs of previous messages in thread. */
    references?: string[];
}
