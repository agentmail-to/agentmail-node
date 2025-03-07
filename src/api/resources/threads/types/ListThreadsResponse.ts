/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as AgentMail from "../../../index";

/**
 * @example
 *     {
 *         threads: [{
 *                 threadId: "thread_123",
 *                 eventId: "event_123",
 *                 labels: ["RECEIVED", "UNREAD"],
 *                 timestamp: "2024-01-15T09:30:00Z",
 *                 senders: ["alice@example.com", "bob@example.com"],
 *                 recipients: ["alice@example.com", "bob@example.com"],
 *                 messageCount: 3,
 *                 subject: "Project Discussion",
 *                 preview: "Let's review the timeline for..."
 *             }, {
 *                 threadId: "thread_456",
 *                 eventId: "event_456",
 *                 labels: ["SENT"],
 *                 timestamp: "2024-01-15T10:15:00Z",
 *                 senders: ["charlie@example.com"],
 *                 recipients: ["david@example.com"],
 *                 messageCount: 1,
 *                 subject: "Weekly Update",
 *                 preview: "Here's what we accomplished..."
 *             }],
 *         limit: 10,
 *         count: 2,
 *         lastKey: "thread_456#2024-01-15T10:15:00Z"
 *     }
 */
export interface ListThreadsResponse {
    /** Thread items. Ordered by `updated_at` descending. */
    threads: AgentMail.ThreadItem[];
    count: AgentMail.Count;
    limit?: AgentMail.Limit;
    lastKey?: AgentMail.LastKey;
}
