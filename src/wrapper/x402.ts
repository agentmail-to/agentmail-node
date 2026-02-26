import type { x402Client } from "@x402/fetch";
import { probe402 } from "./probe402.js";

export async function getPaymentHeaders(wsUrl: string, client: x402Client): Promise<Record<string, string>> {
    const { x402HTTPClient } = await import("@x402/fetch");
    const httpClient = new x402HTTPClient(client);

    const response = await probe402(wsUrl);

    let body: unknown;
    try {
        body = JSON.parse(await response.text());
    } catch {
        body = undefined;
    }

    const getHeader = (name: string) => response.headers.get(name);
    const paymentRequired = httpClient.getPaymentRequiredResponse(getHeader, body);

    const paymentPayload = await httpClient.createPaymentPayload(paymentRequired);
    return httpClient.encodePaymentSignatureHeader(paymentPayload);
}
