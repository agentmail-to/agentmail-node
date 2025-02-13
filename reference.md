# Reference

## Inboxes

<details><summary><code>client.inboxes.<a href="/src/api/resources/inboxes/client/Client.ts">listInboxes</a>({ ...params }) -> AgentMailApi.ListInboxesResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.listInboxes();
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

**request:** `AgentMailApi.ListInboxesRequest`

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

<details><summary><code>client.inboxes.<a href="/src/api/resources/inboxes/client/Client.ts">getInbox</a>(inboxId) -> AgentMailApi.Inbox</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.getInbox("inbox_id");
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

**inboxId:** `AgentMailApi.InboxId`

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

<details><summary><code>client.inboxes.<a href="/src/api/resources/inboxes/client/Client.ts">createInbox</a>({ ...params }) -> AgentMailApi.Inbox</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.createInbox({
    username: "yourinbox",
    displayName: "Your Inbox",
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

**request:** `AgentMailApi.CreateInboxRequest`

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

<details><summary><code>client.inboxes.<a href="/src/api/resources/inboxes/client/Client.ts">deleteInbox</a>(inboxId) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete inbox and all of its threads, messages, and attachments.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.deleteInbox("yourinbox@agentmail.to");
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

**inboxId:** `AgentMailApi.InboxId`

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

## Messages

<details><summary><code>client.messages.<a href="/src/api/resources/messages/client/Client.ts">listMessages</a>(inboxId, { ...params }) -> AgentMailApi.ListMessagesResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.messages.listMessages("inbox_id");
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

**inboxId:** `AgentMailApi.InboxId`

</dd>
</dl>

<dl>
<dd>

**request:** `AgentMailApi.ListMessagesRequest`

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

<details><summary><code>client.messages.<a href="/src/api/resources/messages/client/Client.ts">getMessage</a>(inboxId, messageId) -> AgentMailApi.Message</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.messages.getMessage("inbox_id", "message_id");
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

**inboxId:** `AgentMailApi.InboxId`

</dd>
</dl>

<dl>
<dd>

**messageId:** `AgentMailApi.MessageId`

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

<details><summary><code>client.messages.<a href="/src/api/resources/messages/client/Client.ts">deleteMessage</a>(inboxId, messageId) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete message and its attachments.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.messages.deleteMessage("inbox_id", "message_id");
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

**inboxId:** `AgentMailApi.InboxId`

</dd>
</dl>

<dl>
<dd>

**messageId:** `AgentMailApi.MessageId`

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

<details><summary><code>client.messages.<a href="/src/api/resources/messages/client/Client.ts">sendMessage</a>(inboxId, { ...params }) -> AgentMailApi.SendMessageResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.messages.sendMessage("inbox_id", {
    to: "to",
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

**inboxId:** `AgentMailApi.InboxId`

</dd>
</dl>

<dl>
<dd>

**request:** `AgentMailApi.SendMessageRequest`

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

<details><summary><code>client.messages.<a href="/src/api/resources/messages/client/Client.ts">replyToMessage</a>(inboxId, messageId, { ...params }) -> AgentMailApi.SendMessageResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.messages.replyToMessage("inbox_id", "message_id", {
    to: undefined,
    cc: undefined,
    bcc: undefined,
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

**inboxId:** `AgentMailApi.InboxId`

</dd>
</dl>

<dl>
<dd>

**messageId:** `AgentMailApi.MessageId`

</dd>
</dl>

<dl>
<dd>

**request:** `AgentMailApi.ReplyToMessageRequest`

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

## Threads

<details><summary><code>client.threads.<a href="/src/api/resources/threads/client/Client.ts">listThreads</a>(inboxId, { ...params }) -> AgentMailApi.ListThreadsResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.threads.listThreads("inbox_id");
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

**inboxId:** `AgentMailApi.InboxId`

</dd>
</dl>

<dl>
<dd>

**request:** `AgentMailApi.ListThreadsRequest`

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

<details><summary><code>client.threads.<a href="/src/api/resources/threads/client/Client.ts">getThread</a>(inboxId, threadId) -> AgentMailApi.Thread</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.threads.getThread("inbox_id", "thread_id");
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

**inboxId:** `AgentMailApi.InboxId`

</dd>
</dl>

<dl>
<dd>

**threadId:** `AgentMailApi.ThreadId`

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

<details><summary><code>client.threads.<a href="/src/api/resources/threads/client/Client.ts">deleteThread</a>(inboxId, threadId) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete thread and all of its messages and attachments.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.threads.deleteThread("inbox_id", "thread_id");
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

**inboxId:** `AgentMailApi.InboxId`

</dd>
</dl>

<dl>
<dd>

**threadId:** `AgentMailApi.ThreadId`

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
