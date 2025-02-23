/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as AgentMail from "../../../index";

/**
 * @example
 *     {
 *         threadId: "thread_123",
 *         inboxId: "yourinbox@agentmail.to",
 *         createdAt: "2024-01-15T09:30:00Z",
 *         updatedAt: "2024-01-15T10:15:00Z",
 *         subject: "Project Discussion",
 *         participants: ["alice@example.com", "bob@example.com"],
 *         messageCount: 1,
 *         messages: [{
 *                 messageId: "msg_123",
 *                 threadId: "thread_123",
 *                 sentAt: "2024-01-15T09:30:00Z",
 *                 receivedAt: "2024-01-15T09:30:00Z",
 *                 from: "alice@example.com",
 *                 to: ["bob@example.com"],
 *                 text: "Let's review the timeline for the project."
 *             }]
 *     }
 */
export interface Thread {
    threadId: AgentMail.ThreadId;
    inboxId: AgentMail.InboxId;
    /** Time at which thread was created. */
    createdAt: Date;
    updatedAt: AgentMail.ThreadUpdatedAt;
    participants: AgentMail.ThreadParticipants;
    messageCount: AgentMail.ThreadMessageCount;
    /** Messages in thread. Ordered by `sent_at` ascending. */
    messages: AgentMail.Message[];
    subject?: AgentMail.ThreadSubject;
    preview?: AgentMail.ThreadPreview;
    attachments?: AgentMail.ThreadAttachments;
}
