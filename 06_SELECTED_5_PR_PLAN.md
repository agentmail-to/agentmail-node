# 06_SELECTED_5_PR_PLAN.md — agentmail-node

## Selected PRs for AgentMail Node SDK

Based on analysis of open issues and quality audit, here are the priority PRs to create:

---

## PR #1: Fix WebSocket connection on Node.js 24+

**Issue**: #12 - WebSocket connection fails on Node.js 24  
**Branch**: `fix/websocket-node-24`  
**Type**: Bug fix  
**Effort**: Low  

### Problem
Node.js 24+ has a built-in WebSocket that gets used instead of the `ws` package because `RUNTIME.type` still returns "node". The built-in WebSocket doesn't support custom headers, so the `Authorization: Bearer` header is never sent, causing 403 errors.

### Analysis
Looking at `src/core/websocket/ws.ts`:
```typescript
const getGlobalWebSocket = (): WebSocket | undefined => {
    if (RUNTIME.type === "node" || RUNTIME.type === "bun" || RUNTIME.type === "deno") {
        return NodeWebSocket as unknown as WebSocket;
    } else if (typeof WebSocket !== "undefined") {
        return WebSocket;
    }
    return undefined;
};
```

The code DOES check for node first and returns the `ws` package's `NodeWebSocket`. However, the issue suggests Node 24 still fails. Possible causes:
1. The `ws` package is somehow not imported correctly in Node 24
2. The bundler or runtime is picking up the built-in WebSocket instead
3. The `RUNTIME.type` check is failing on Node 24

### Fix Plan
1. Add explicit version check in `getGlobalWebSocket()` to ensure `ws` package is used on Node 22+
2. Add a fallback check that verifies the WebSocket actually supports headers
3. Add a test that validates WebSocket works with custom headers

### Files to Modify
- `src/core/websocket/ws.ts` - Fix `getGlobalWebSocket()` function

---

## PR #2: Add waitForInboxReady() helper for inbox propagation delay

**Issue**: #14 - Inbox not immediately available after create  
**Branch**: `feat/wait-for-inbox-ready`  
**Type**: Enhancement  
**Effort**: Medium  

### Problem
When creating an inbox and immediately sending a message, users get a 404 for ~1-2 seconds while the inbox propagates server-side.

### Fix Plan
1. Add `waitForInboxReady(inboxId, options?)` method to `InboxesClient`
2. Poll the inbox status endpoint until it's ready or timeout
3. Default timeout: 10 seconds, poll interval: 500ms
4. Add wire tests for the new helper
5. Update README with usage example

### API Design
```typescript
interface WaitForInboxReadyOptions {
    timeoutMs?: number;      // Default: 10000
    pollIntervalMs?: number; // Default: 500
    signal?: AbortSignal;     // Optional cancellation
}

async waitForInboxReady(
    inboxId: string,
    options?: WaitForInboxReadyOptions
): Promise<Inbox>  // Returns the ready inbox
```

### Files to Modify
- `src/api/resources/inboxes/client/Client.ts` - Add new method
- `tests/wire/inboxes/main.test.ts` - Add wire tests
- `README.md` - Document the helper

---

## PR #3: Fix lint errors in test files

**Branch**: `fix/lint-errors`  
**Type**: Quality  
**Effort**: Low  

### Problems
1. `tests/unit/wrapper/Client.test.ts:95` - Non-null assertion (`fetch!`)
2. `tests/unit/wrapper/WebsocketsClient.test.ts:1` - Import sorting

### Fix Plan
1. Fix the non-null assertion using optional chaining
2. Run `pnpm run check:fix` to auto-fix import sorting

### Files to Modify
- `tests/unit/wrapper/Client.test.ts`
- `tests/unit/wrapper/WebsocketsClient.test.ts`

---

## PR #4: Add retry logic to message send with initial delay

**Issue**: #14 (alternative/companion fix)  
**Branch**: `feat/send-with-retry`  
**Type**: Enhancement  
**Effort**: Medium  

### Problem
The inbox propagation delay causes immediate `send()` to fail.

### Fix Plan
1. Add a `sendWithRetry` option to the messages send method
2. On 404 response, automatically retry with exponential backoff
3. Max 3 retries with initial 500ms delay
4. Make this configurable via `RequestOptions`

### Files to Modify
- `src/api/resources/inboxes/resources/messages/` - Modify send method
- `src/BaseClient.ts` - Add retry options to `BaseRequestOptions`
- `tests/wire/` - Add tests for retry behavior

---

## PR #5: Improve error messages for 404s

**Branch**: `feat/better-404-errors`  
**Type**: Enhancement  
**Effort**: Low  

### Problem
When a 404 occurs (like on fresh inbox), the error message isn't helpful for debugging.

### Fix Plan
1. Add context to 404 errors suggesting the inbox might not be ready
2. Include the inbox ID and suggested actions in the error message
3. This helps users understand the propagation delay without reading docs

### Files to Modify
- `src/api/errors/` - Enhance error classes
- `src/core/fetcher/` - Add error context middleware

---

## Implementation Order

```
1. PR #3 (Lint fixes)      → Quick win, validates CI
2. PR #1 (WebSocket fix)   → High priority, affects Node 24 users
3. PR #5 (Better errors)   → Low effort, improves DX
4. PR #2 (waitForInboxReady) → Medium effort, best UX solution
5. PR #4 (Send with retry)  → Alternative/companion to PR #2
```

---

## Notes

- PRs #2 and #4 are related to Issue #14 — consider combining into one PR
- All PRs should include tests (unit + wire where applicable)
- All PRs should run `pnpm run check:fix` before committing
- Generated code should not be modified directly — use `.fernignore` approach per CONTRIBUTING.md