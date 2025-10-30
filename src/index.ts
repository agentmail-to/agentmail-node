export * as AgentMail from "./api/index.js";
export type { BaseClientOptions, BaseRequestOptions } from "./BaseClient.js";
export { AgentMailClient } from "./Client.js";
export { AgentMailEnvironment, type AgentMailEnvironmentUrls } from "./environments.js";
export { AgentMailError, AgentMailTimeoutError } from "./errors/index.js";
export * from "./exports.js";
export * as serialization from "./serialization/index.js";
