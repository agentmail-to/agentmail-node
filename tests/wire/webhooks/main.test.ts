/**
 * This file was auto-generated by Fern from our API Definition.
 */

import { mockServerPool } from "../../mock-server/MockServerPool";
import { AgentMailClient } from "../../../src/Client";

describe("Webhooks", () => {
    test("list", async () => {
        const server = mockServerPool.createServer();
        const client = new AgentMailClient({
            apiKey: "test",
            environment: { http: server.baseUrl, websockets: server.baseUrl },
        });

        const rawResponseBody = {
            count: 1,
            limit: 1,
            next_page_token: "next_page_token",
            webhooks: [
                {
                    webhook_id: "webhook_id",
                    url: "url",
                    event_types: ["message.received", "message.received"],
                    inbox_ids: ["inbox_ids", "inbox_ids"],
                    secret: "secret",
                    enabled: true,
                    updated_at: "2024-01-15T09:30:00Z",
                    created_at: "2024-01-15T09:30:00Z",
                    client_id: "client_id",
                },
                {
                    webhook_id: "webhook_id",
                    url: "url",
                    event_types: ["message.received", "message.received"],
                    inbox_ids: ["inbox_ids", "inbox_ids"],
                    secret: "secret",
                    enabled: true,
                    updated_at: "2024-01-15T09:30:00Z",
                    created_at: "2024-01-15T09:30:00Z",
                    client_id: "client_id",
                },
            ],
        };
        server.mockEndpoint().get("/v0/webhooks").respondWith().statusCode(200).jsonBody(rawResponseBody).build();

        const response = await client.webhooks.list();
        expect(response).toEqual({
            count: 1,
            limit: 1,
            next_page_token: "next_page_token",
            webhooks: [
                {
                    webhook_id: "webhook_id",
                    url: "url",
                    event_types: ["message.received", "message.received"],
                    inbox_ids: ["inbox_ids", "inbox_ids"],
                    secret: "secret",
                    enabled: true,
                    updated_at: "2024-01-15T09:30:00Z",
                    created_at: "2024-01-15T09:30:00Z",
                    client_id: "client_id",
                },
                {
                    webhook_id: "webhook_id",
                    url: "url",
                    event_types: ["message.received", "message.received"],
                    inbox_ids: ["inbox_ids", "inbox_ids"],
                    secret: "secret",
                    enabled: true,
                    updated_at: "2024-01-15T09:30:00Z",
                    created_at: "2024-01-15T09:30:00Z",
                    client_id: "client_id",
                },
            ],
        });
    });

    test("get", async () => {
        const server = mockServerPool.createServer();
        const client = new AgentMailClient({
            apiKey: "test",
            environment: { http: server.baseUrl, websockets: server.baseUrl },
        });

        const rawResponseBody = {
            webhook_id: "webhook_id",
            url: "url",
            event_types: ["message.received", "message.received"],
            inbox_ids: ["inbox_ids", "inbox_ids"],
            secret: "secret",
            enabled: true,
            updated_at: "2024-01-15T09:30:00Z",
            created_at: "2024-01-15T09:30:00Z",
            client_id: "client_id",
        };
        server
            .mockEndpoint()
            .get("/v0/webhooks/webhook_id")
            .respondWith()
            .statusCode(200)
            .jsonBody(rawResponseBody)
            .build();

        const response = await client.webhooks.get("webhook_id");
        expect(response).toEqual({
            webhook_id: "webhook_id",
            url: "url",
            event_types: ["message.received", "message.received"],
            inbox_ids: ["inbox_ids", "inbox_ids"],
            secret: "secret",
            enabled: true,
            updated_at: "2024-01-15T09:30:00Z",
            created_at: "2024-01-15T09:30:00Z",
            client_id: "client_id",
        });
    });

    test("create", async () => {
        const server = mockServerPool.createServer();
        const client = new AgentMailClient({
            apiKey: "test",
            environment: { http: server.baseUrl, websockets: server.baseUrl },
        });
        const rawRequestBody = {
            url: "url",
            event_types: ["message.received", "message.received"],
            inbox_ids: undefined,
            client_id: undefined,
        };
        const rawResponseBody = {
            webhook_id: "webhook_id",
            url: "url",
            event_types: ["message.received", "message.received"],
            inbox_ids: ["inbox_ids", "inbox_ids"],
            secret: "secret",
            enabled: true,
            updated_at: "2024-01-15T09:30:00Z",
            created_at: "2024-01-15T09:30:00Z",
            client_id: "client_id",
        };
        server
            .mockEndpoint()
            .post("/v0/webhooks")
            .jsonBody(rawRequestBody)
            .respondWith()
            .statusCode(200)
            .jsonBody(rawResponseBody)
            .build();

        const response = await client.webhooks.create({
            url: "url",
            event_types: ["message.received", "message.received"],
            inbox_ids: undefined,
            client_id: undefined,
        });
        expect(response).toEqual({
            webhook_id: "webhook_id",
            url: "url",
            event_types: ["message.received", "message.received"],
            inbox_ids: ["inbox_ids", "inbox_ids"],
            secret: "secret",
            enabled: true,
            updated_at: "2024-01-15T09:30:00Z",
            created_at: "2024-01-15T09:30:00Z",
            client_id: "client_id",
        });
    });

    test("delete", async () => {
        const server = mockServerPool.createServer();
        const client = new AgentMailClient({
            apiKey: "test",
            environment: { http: server.baseUrl, websockets: server.baseUrl },
        });

        server.mockEndpoint().delete("/v0/webhooks/webhook_id").respondWith().statusCode(200).build();

        const response = await client.webhooks.delete("webhook_id");
        expect(response).toEqual(undefined);
    });
});
