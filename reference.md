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

**request:** `AgentMail.ListInboxesRequest`

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

## Messages

<details><summary><code>client.messages.<a href="/src/api/resources/messages/client/Client.ts">list</a>(inboxId, { ...params }) -> AgentMail.ListMessagesResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

List messages in inbox. If neither or both `received` and `sent` query parameters are set, all messages are returned.

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
await client.messages.list("inbox_id");
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

**request:** `AgentMail.ListMessagesRequest`

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

<details><summary><code>client.messages.<a href="/src/api/resources/messages/client/Client.ts">get</a>(inboxId, messageId) -> AgentMail.Message</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.messages.get("inbox_id", "message_id");
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

<details><summary><code>client.messages.<a href="/src/api/resources/messages/client/Client.ts">send</a>(inboxId, { ...params }) -> AgentMail.SendMessageResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.messages.send("inbox_id", {
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

<details><summary><code>client.messages.<a href="/src/api/resources/messages/client/Client.ts">reply</a>(inboxId, messageId, { ...params }) -> AgentMail.SendMessageResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.messages.reply("inbox_id", "message_id", {
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

## Threads

<details><summary><code>client.threads.<a href="/src/api/resources/threads/client/Client.ts">list</a>(inboxId, { ...params }) -> AgentMail.ListThreadsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

List threads in inbox. If neither or both `received` and `sent` query parameters are set, all threads are returned.

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
await client.threads.list("inbox_id");
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

<details><summary><code>client.threads.<a href="/src/api/resources/threads/client/Client.ts">get</a>(inboxId, threadId) -> AgentMail.Thread</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.threads.get("inbox_id", "thread_id");
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
