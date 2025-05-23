/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as AgentMail from "../../../../../index";

export interface ReplyToMessageRequest {
    to?: AgentMail.inboxes.SendMessageTo;
    cc?: AgentMail.inboxes.SendMessageCc;
    bcc?: AgentMail.inboxes.SendMessageBcc;
    text?: AgentMail.inboxes.MessageText;
    html?: AgentMail.inboxes.MessageHtml;
    attachments?: AgentMail.inboxes.SendMessageAttachments;
}
