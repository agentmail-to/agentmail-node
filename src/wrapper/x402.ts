import type { x402Client } from "@x402/fetch";

export async function getPaymentHeaders(wsUrl: string, client: x402Client): Promise<Record<string, string>> {
    const { x402HTTPClient } = await import("@x402/fetch");
    const httpClient = new x402HTTPClient(client);

    const httpUrl = wsUrl.replace(/^wss:\/\//, "https://").replace(/^ws:\/\//, "http://");

    const response = await fetch(httpUrl);
    if (response.status !== 402) {
        throw new Error(`x402: expected 402 from ${httpUrl} but got ${response.status}`);
    }

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
