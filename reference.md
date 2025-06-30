# Reference

## Inboxes

<details><summary><code>client.inboxes.<a href="/src/api/resources/inboxes/client/Client.ts">list</a>({ ...params }) -> AgentMail.ListInboxesResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.list();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `AgentMail.inboxes.ListInboxesRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Inboxes.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.inboxes.<a href="/src/api/resources/inboxes/client/Client.ts">get</a>(inboxId) -> AgentMail.Inbox</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.get("inbox_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**inboxId:** `AgentMail.InboxId`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Inboxes.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.inboxes.<a href="/src/api/resources/inboxes/client/Client.ts">create</a>({ ...params }) -> AgentMail.Inbox</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.create({
    username: undefined,
    domain: undefined,
    displayName: undefined,
    clientId: undefined,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `AgentMail.CreateInboxRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Inboxes.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Contexts

<details><summary><code>client.contexts.<a href="/src/api/resources/contexts/client/Client.ts">list</a>({ ...params }) -> AgentMail.ListContextsResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.contexts.list();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `AgentMail.ListContextsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Contexts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.contexts.<a href="/src/api/resources/contexts/client/Client.ts">get</a>(contextId) -> AgentMail.Context</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.contexts.get("context_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**contextId:** `AgentMail.ContextId`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Contexts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.contexts.<a href="/src/api/resources/contexts/client/Client.ts">create</a>({ ...params }) -> AgentMail.Context</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.contexts.create({
    type: "type",
    data: {
        data: {
            key: "value",
        },
    },
    metadata: undefined,
    isEvent: true,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `AgentMail.CreateContextRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Contexts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.contexts.<a href="/src/api/resources/contexts/client/Client.ts">delete</a>(contextId) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.contexts.delete("context_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**contextId:** `AgentMail.ContextId`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Contexts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Drafts

<details><summary><code>client.drafts.<a href="/src/api/resources/drafts/client/Client.ts">list</a>({ ...params }) -> AgentMail.ListDraftsResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.drafts.list();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `AgentMail.ListDraftsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Drafts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.drafts.<a href="/src/api/resources/drafts/client/Client.ts">get</a>(draftId) -> AgentMail.Draft</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.drafts.get("draft_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**draftId:** `AgentMail.DraftId`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Drafts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Inboxes Drafts

<details><summary><code>client.inboxes.drafts.<a href="/src/api/resources/inboxes/resources/drafts/client/Client.ts">list</a>(inboxId, { ...params }) -> AgentMail.ListDraftsResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.drafts.list("inbox_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**inboxId:** `AgentMail.InboxId`

</dd>
</dl>

<dl>
<dd>

**request:** `AgentMail.inboxes.ListDraftsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Drafts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.inboxes.drafts.<a href="/src/api/resources/inboxes/resources/drafts/client/Client.ts">get</a>(inboxId, draftId) -> AgentMail.Draft</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.drafts.get("inbox_id", "draft_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**inboxId:** `AgentMail.InboxId`

</dd>
</dl>

<dl>
<dd>

**draftId:** `AgentMail.DraftId`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Drafts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.inboxes.drafts.<a href="/src/api/resources/inboxes/resources/drafts/client/Client.ts">create</a>(inboxId, { ...params }) -> AgentMail.Draft</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.drafts.create("inbox_id", {
    labels: undefined,
    replyTo: undefined,
    to: undefined,
    cc: undefined,
    bcc: undefined,
    subject: undefined,
    text: undefined,
    html: undefined,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**inboxId:** `AgentMail.InboxId`

</dd>
</dl>

<dl>
<dd>

**request:** `AgentMail.CreateDraftRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Drafts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.inboxes.drafts.<a href="/src/api/resources/inboxes/resources/drafts/client/Client.ts">send</a>(inboxId, draftId, { ...params }) -> AgentMail.SendMessageResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.drafts.send("inbox_id", "draft_id", {
    addLabels: undefined,
    removeLabels: undefined,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**inboxId:** `AgentMail.InboxId`

</dd>
</dl>

<dl>
<dd>

**draftId:** `AgentMail.DraftId`

</dd>
</dl>

<dl>
<dd>

**request:** `AgentMail.UpdateMessageRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Drafts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Inboxes Messages

<details><summary><code>client.inboxes.messages.<a href="/src/api/resources/inboxes/resources/messages/client/Client.ts">list</a>(inboxId, { ...params }) -> AgentMail.ListMessagesResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.messages.list("inbox_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**inboxId:** `AgentMail.InboxId`

</dd>
</dl>

<dl>
<dd>

**request:** `AgentMail.inboxes.ListMessagesRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Messages.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.inboxes.messages.<a href="/src/api/resources/inboxes/resources/messages/client/Client.ts">get</a>(inboxId, messageId) -> AgentMail.Message</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.messages.get("inbox_id", "message_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**inboxId:** `AgentMail.InboxId`

</dd>
</dl>

<dl>
<dd>

**messageId:** `AgentMail.MessageId`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Messages.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.inboxes.messages.<a href="/src/api/resources/inboxes/resources/messages/client/Client.ts">send</a>(inboxId, { ...params }) -> AgentMail.SendMessageResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.messages.send("inbox_id", {
    labels: undefined,
    replyTo: undefined,
    to: undefined,
    cc: undefined,
    bcc: undefined,
    subject: undefined,
    text: undefined,
    html: undefined,
    attachments: undefined,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**inboxId:** `AgentMail.InboxId`

</dd>
</dl>

<dl>
<dd>

**request:** `AgentMail.SendMessageRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Messages.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.inboxes.messages.<a href="/src/api/resources/inboxes/resources/messages/client/Client.ts">reply</a>(inboxId, messageId, { ...params }) -> AgentMail.SendMessageResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.messages.reply("inbox_id", "message_id", {
    labels: undefined,
    replyTo: undefined,
    to: undefined,
    cc: undefined,
    bcc: undefined,
    text: undefined,
    html: undefined,
    attachments: undefined,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**inboxId:** `AgentMail.InboxId`

</dd>
</dl>

<dl>
<dd>

**messageId:** `AgentMail.MessageId`

</dd>
</dl>

<dl>
<dd>

**request:** `AgentMail.ReplyToMessageRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Messages.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.inboxes.messages.<a href="/src/api/resources/inboxes/resources/messages/client/Client.ts">update</a>(inboxId, messageId, { ...params }) -> AgentMail.Message</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.messages.update("inbox_id", "message_id", {
    addLabels: undefined,
    removeLabels: undefined,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**inboxId:** `AgentMail.InboxId`

</dd>
</dl>

<dl>
<dd>

**messageId:** `AgentMail.MessageId`

</dd>
</dl>

<dl>
<dd>

**request:** `AgentMail.UpdateMessageRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Messages.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Inboxes Threads

<details><summary><code>client.inboxes.threads.<a href="/src/api/resources/inboxes/resources/threads/client/Client.ts">list</a>(inboxId, { ...params }) -> AgentMail.ListThreadsResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.threads.list("inbox_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**inboxId:** `AgentMail.InboxId`

</dd>
</dl>

<dl>
<dd>

**request:** `AgentMail.inboxes.ListThreadsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Threads.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.inboxes.threads.<a href="/src/api/resources/inboxes/resources/threads/client/Client.ts">get</a>(inboxId, threadId) -> AgentMail.Thread</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.threads.get("inbox_id", "thread_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**inboxId:** `AgentMail.InboxId`

</dd>
</dl>

<dl>
<dd>

**threadId:** `AgentMail.ThreadId`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Threads.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Threads

<details><summary><code>client.threads.<a href="/src/api/resources/threads/client/Client.ts">list</a>({ ...params }) -> AgentMail.ListThreadsResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.threads.list();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `AgentMail.ListThreadsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Threads.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.threads.<a href="/src/api/resources/threads/client/Client.ts">get</a>(threadId) -> AgentMail.Thread</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.threads.get("thread_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**threadId:** `AgentMail.ThreadId`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Threads.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Webhooks

<details><summary><code>client.webhooks.<a href="/src/api/resources/webhooks/client/Client.ts">list</a>({ ...params }) -> AgentMail.ListWebhooksResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.webhooks.list();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `AgentMail.ListWebhooksRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Webhooks.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.webhooks.<a href="/src/api/resources/webhooks/client/Client.ts">get</a>(webhookId) -> AgentMail.Webhook</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.webhooks.get("webhook_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**webhookId:** `AgentMail.WebhookId`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Webhooks.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.webhooks.<a href="/src/api/resources/webhooks/client/Client.ts">create</a>({ ...params }) -> AgentMail.Webhook</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.webhooks.create({
    url: "url",
    eventTypes: ["message.received", "message.received"],
    inboxIds: undefined,
    clientId: undefined,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `AgentMail.CreateWebhookRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Webhooks.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.webhooks.<a href="/src/api/resources/webhooks/client/Client.ts">delete</a>(webhookId) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.webhooks.delete("webhook_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**webhookId:** `AgentMail.WebhookId`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Webhooks.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>
