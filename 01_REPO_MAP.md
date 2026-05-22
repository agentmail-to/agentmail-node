# 01_REPO_MAP.md — agentmail-node

## Repository Hierarchy

```
github.com/agentmail-to/agentmail-node  (upstream, org: agentmail-to)
    └── fork: github.com/okwn/agentmail-node  (user fork)
```

## Branches

### Upstream (`agentmail-to/agentmail-node`)
| Branch | Description |
|--------|-------------|
| `main` | Primary development branch |
| `haakam/eng-300-sdks-x402mpp` | Feature branch (MPP fetch fix) |
| `readme-upgrade-node-sdk` | Documentation update branch |

### Local (okwn/agentmail-node)
| Branch | Description |
|--------|-------------|
| `main` | Synced with upstream main |

## Package Exports Map

```
agentmail (package)
├── .                           → dist/cjs/index.js / dist/esm/index.mjs
├── ./serialization             → src/serialization
├── ./inboxes                   → src/api/resources/inboxes
├── ./pods                      → src/api/resources/pods
├── ./webhooks                  → src/api/resources/webhooks
├── ./agent                     → src/api/resources/agent
├── ./apiKeys                   → src/api/resources/apiKeys
├── ./domains                   → src/api/resources/domains
├── ./drafts                    → src/api/resources/drafts
├── ./inboxes/apiKeys           → src/api/resources/inboxes/resources/apiKeys
├── ./inboxes/drafts            → src/api/resources/inboxes/resources/drafts
├── ./inboxes/events            → src/api/resources/inboxes/resources/events
├── ./inboxes/lists             → src/api/resources/inboxes/resources/lists
├── ./inboxes/messages          → src/api/resources/inboxes/resources/messages
├── ./inboxes/metrics           → src/api/resources/inboxes/resources/metrics
├── ./inboxes/threads           → src/api/resources/inboxes/resources/threads
├── ./pods/apiKeys              → src/api/resources/pods/resources/apiKeys
├── ./pods/domains             → src/api/resources/pods/resources/domains
├── ./pods/drafts              → src/api/resources/pods/resources/drafts
├── ./pods/inboxes             → src/api/resources/pods/resources/inboxes
├── ./pods/lists               → src/api/resources/pods/resources/lists
├── ./pods/metrics             → src/api/resources/pods/resources/metrics
├── ./pods/threads             → src/api/resources/pods/resources/threads
├── ./lists                    → src/api/resources/lists
├── ./metrics                  → src/api/resources/metrics
├── ./organizations            → src/api/resources/organizations
├── ./threads                  → src/api/resources/threads
├── ./websockets               → src/api/resources/websockets
└── ./package.json             → package.json
```

## API Resources (18 endpoints)

| Resource | Path | Description |
|----------|------|-------------|
| Inboxes | `src/api/resources/inboxes/` | Email inbox management |
| Pods | `src/api/resources/pods/` | Pod management (contains nested resources) |
| Threads | `src/api/resources/threads/` | Email thread operations |
| Messages | `src/api/resources/messages/` | Message operations |
| Webhooks | `src/api/resources/webhooks/` | Webhook configuration |
| Agent | `src/api/resources/agent/` | Agent-related endpoints |
| API Keys | `src/api/resources/apiKeys/` | API key management |
| Domains | `src/api/resources/domains/` | Domain management |
| Drafts | `src/api/resources/drafts/` | Email draft operations |
| Lists | `src/api/resources/lists/` | Mailing list operations |
| Metrics | `src/api/resources/metrics/` | Analytics/metrics |
| Organizations | `src/api/resources/organizations/` | Organization management |
| Websockets | `src/api/resources/websockets/` | WebSocket connections |
| Attachments | `src/api/resources/attachments/` | File attachments |

## Source Code Structure

```
src/
├── Client.ts                  # Main AgentMailClient class
├── BaseClient.ts              # Base client with auth & options
├── environments.ts            # Environment enumeration (Prod, Sandbox)
├── index.ts                   # Public exports
├── exports.ts                 # Internal exports
├── version.ts                 # Version constant
│
├── api/
│   ├── index.ts               # Re-exports all API resources
│   ├── errors/                # API error classes
│   │   └── index.ts
│   ├── resources/             # Generated API resource modules
│   │   └── [18 resource dirs]
│   │       ├── client/        # Client classes
│   │       ├── components/   # Schema components
│   │       ├── index.ts       # Resource exports
│   │       └── types/         # TypeScript types
│   └── types/                 # Shared API types
│
├── core/                      # Core SDK functionality
│   ├── auth/                  # Auth providers
│   │   ├── BasicAuth.ts
│   │   ├── BearerToken.ts
│   │   └── index.ts
│   ├── fetcher/               # HTTP request handling
│   │   ├── fetcher.ts
│   │   ├── makeRequest.ts
│   │   ├── createRequestUrl.ts
│   │   └── [more files]
│   ├── schemas/               # Type validation schemas
│   │   ├── object/
│   │   ├── primitives/
│   │   ├── union/
│   │   └── [more]
│   ├── websocket/             # WebSocket implementation
│   │   ├── index.ts
│   │   └── ws.ts              # getGlobalWebSocket() - uses ws package
│   ├── logging/               # Logging utilities
│   ├── url/                   # URL utilities
│   ├── runtime/               # Runtime detection (node/browser/deno/bun)
│   └── index.ts
│
├── serialization/             # JSON serialization
│   └── index.ts
│
└── wrapper/                   # x402 payment wrapper
    ├── index.ts
    ├── Client.ts
    └── WebsocketsClient.ts
```

## Test Structure

```
tests/
├── setup.ts                   # Test setup
├── tsconfig.json              # Test TypeScript config
├── custom.test.ts            # Custom integration tests
├── mock-server/              # MSW mock server
│   ├── setup.ts
│   └── [handlers]
├── unit/                      # Unit tests (39 test files)
│   ├── fetcher/               # HTTP layer tests
│   ├── logging/               # Logging tests
│   ├── schemas/               # Schema validation tests
│   ├── url/                   # URL utility tests
│   ├── auth/                  # Auth provider tests
│   ├── base64.test.ts
│   └── wrapper/               # Wrapper tests
│
└── wire/                      # Wire/integration tests (32 test files)
    ├── inboxes/               # Inboxes API tests
    ├── pods/                  # Pods API tests
    ├── threads/               # Threads API tests
    ├── messages/              # Messages API tests
    ├── webhooks/              # Webhooks API tests
    ├── agent.test.ts
    ├── apiKeys.test.ts
    ├── domains.test.ts
    ├── drafts.test.ts
    ├── lists.test.ts
    ├── metrics.test.ts
    ├── organizations.test.ts
    └── [resource].test.ts
```

## Key Files

| File | Purpose |
|------|---------|
| `package.json` | Package manifest, scripts, dependencies |
| `biome.json` | Biome linter/formatter config |
| `vitest.config.mts` | Vitest test configuration |
| `tsconfig.json` | TypeScript base config |
| `tsconfig.cjs.json` | CommonJS build config |
| `tsconfig.esm.json` | ESM build config |
| `.fernignore` | Fern generation ignore rules |
| `.github/workflows/ci.yml` | GitHub Actions CI |
| `reference.md` | Full API reference documentation |
| `CONTRIBUTING.md` | Contributing guidelines |

## NPM Registry

- **Package**: `agentmail` on npm
- **Current version**: `0.5.3`
- **Build outputs**: CJS (`dist/cjs/`) + ESM (`dist/esm/`)
- **Publish tags**: alpha, beta, backport, latest (based on version)