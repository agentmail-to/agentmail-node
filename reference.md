# Reference

## Inboxes

<details><summary><code>client.inboxes.<a href="/src/api/resources/inboxes/client/Client.ts">list</a>({ ...params }) -> core.Page<AgentMail.Inbox></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.inboxes.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.inboxes.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
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

<details><summary><code>client.inboxes.<a href="/src/api/resources/inboxes/client/Client.ts">delete</a>(inboxId) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.delete("inbox_id");
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

## Webhooks

<details><summary><code>client.webhooks.<a href="/src/api/resources/webhooks/client/Client.ts">list</a>({ ...params }) -> core.Page<AgentMail.Webhook></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.webhooks.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.webhooks.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
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

**request:** `AgentMail.webhooks.ListWebhooksRequest`

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

## ApiKeys

<details><summary><code>client.apiKeys.<a href="/src/api/resources/apiKeys/client/Client.ts">list</a>({ ...params }) -> core.Page<AgentMail.ApiKey></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.apiKeys.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.apiKeys.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
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

**request:** `AgentMail.ListApiKeysRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ApiKeys.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.apiKeys.<a href="/src/api/resources/apiKeys/client/Client.ts">create</a>({ ...params }) -> AgentMail.CreateApiKeyResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.apiKeys.create({
    name: "name",
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

**request:** `AgentMail.CreateApiKeyRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ApiKeys.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.apiKeys.<a href="/src/api/resources/apiKeys/client/Client.ts">delete</a>(apiKey) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.apiKeys.delete("api_key");
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

**apiKey:** `AgentMail.ApiKeyId`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ApiKeys.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Domains

<details><summary><code>client.domains.<a href="/src/api/resources/domains/client/Client.ts">list</a>({ ...params }) -> core.Page<AgentMail.DomainSummary></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.domains.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.domains.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
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

**request:** `AgentMail.ListDomainsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Domains.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.domains.<a href="/src/api/resources/domains/client/Client.ts">get</a>(domain) -> AgentMail.Domain</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.domains.get("domain");
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

**domain:** `AgentMail.DomainId`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Domains.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.domains.<a href="/src/api/resources/domains/client/Client.ts">create</a>({ ...params }) -> AgentMail.CreateDomainResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.domains.create({
    domain: "domain",
    feedbackEnabled: undefined,
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

**request:** `AgentMail.CreateDomainRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Domains.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.domains.<a href="/src/api/resources/domains/client/Client.ts">delete</a>(domain) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.domains.delete("domain");
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

**domain:** `AgentMail.DomainId`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Domains.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Drafts

<details><summary><code>client.drafts.<a href="/src/api/resources/drafts/client/Client.ts">list</a>({ ...params }) -> core.Page<AgentMail.DraftItem></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.drafts.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.drafts.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
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

<details><summary><code>client.inboxes.drafts.<a href="/src/api/resources/inboxes/resources/drafts/client/Client.ts">list</a>(inboxId, { ...params }) -> core.Page<AgentMail.DraftItem></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.inboxes.drafts.list("inbox_id");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.inboxes.drafts.list("inbox_id");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
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
    inReplyTo: undefined,
    sendAt: undefined,
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

<details><summary><code>client.inboxes.drafts.<a href="/src/api/resources/inboxes/resources/drafts/client/Client.ts">delete</a>(inboxId, draftId) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.drafts.delete("inbox_id", "draft_id");
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

## Inboxes Messages

<details><summary><code>client.inboxes.messages.<a href="/src/api/resources/inboxes/resources/messages/client/Client.ts">list</a>(inboxId, { ...params }) -> core.Page<AgentMail.MessageItem></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.inboxes.messages.list("inbox_id");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.inboxes.messages.list("inbox_id");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
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

<details><summary><code>client.inboxes.messages.<a href="/src/api/resources/inboxes/resources/messages/client/Client.ts">getAttachment</a>(inboxId, messageId, attachmentId) -> core.BinaryResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.messages.getAttachment("inbox_id", "message_id", "attachment_id");
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

**attachmentId:** `AgentMail.AttachmentId`

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

<details><summary><code>client.inboxes.messages.<a href="/src/api/resources/inboxes/resources/messages/client/Client.ts">getRaw</a>(inboxId, messageId) -> core.BinaryResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.messages.getRaw("inbox_id", "message_id");
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

## Inboxes Metrics

<details><summary><code>client.inboxes.metrics.<a href="/src/api/resources/inboxes/resources/metrics/client/Client.ts">get</a>(inboxId, { ...params }) -> AgentMail.ListMetricsResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.metrics.get("inbox_id", {
    startTimestamp: new Date("2024-01-15T09:30:00.000Z"),
    endTimestamp: new Date("2024-01-15T09:30:00.000Z"),
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

**request:** `AgentMail.inboxes.ListInboxMetricsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Metrics.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Inboxes Threads

<details><summary><code>client.inboxes.threads.<a href="/src/api/resources/inboxes/resources/threads/client/Client.ts">list</a>(inboxId, { ...params }) -> core.Page<AgentMail.ThreadItem></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.inboxes.threads.list("inbox_id");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.inboxes.threads.list("inbox_id");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
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

<details><summary><code>client.inboxes.threads.<a href="/src/api/resources/inboxes/resources/threads/client/Client.ts">getAttachment</a>(inboxId, threadId, attachmentId) -> core.BinaryResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.threads.getAttachment("inbox_id", "thread_id", "attachment_id");
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

**attachmentId:** `AgentMail.AttachmentId`

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

<details><summary><code>client.inboxes.threads.<a href="/src/api/resources/inboxes/resources/threads/client/Client.ts">delete</a>(inboxId, threadId) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inboxes.threads.delete("inbox_id", "thread_id");
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

## Metrics

<details><summary><code>client.metrics.<a href="/src/api/resources/metrics/client/Client.ts">list</a>({ ...params }) -> AgentMail.ListMetricsResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.metrics.list({
    startTimestamp: new Date("2024-01-15T09:30:00.000Z"),
    endTimestamp: new Date("2024-01-15T09:30:00.000Z"),
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

**request:** `AgentMail.ListMetricsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Metrics.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Threads

<details><summary><code>client.threads.<a href="/src/api/resources/threads/client/Client.ts">list</a>({ ...params }) -> core.Page<AgentMail.ThreadItem></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.threads.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.threads.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
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

<details><summary><code>client.threads.<a href="/src/api/resources/threads/client/Client.ts">getAttachment</a>(threadId, attachmentId) -> core.BinaryResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.threads.getAttachment("thread_id", "attachment_id");
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

**attachmentId:** `AgentMail.AttachmentId`

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

<details><summary><code>client.threads.<a href="/src/api/resources/threads/client/Client.ts">delete</a>(threadId) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.threads.delete("thread_id");
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
