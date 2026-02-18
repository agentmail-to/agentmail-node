/**
 * Probes a WebSocket endpoint over HTTP to get a 402 response,
 * then signs a payment and returns the headers needed for the WS handshake.
 */
export async function getPaymentHeaders(wsUrl: string, x402Client: unknown): Promise<Record<string, string>> {
    let x402Fetch: typeof import("@x402/fetch");
    try {
        x402Fetch = await import("@x402/fetch");
    } catch {
        throw new Error(
            'x402 WebSocket support requires @x402/fetch to be installed. Run: npm install @x402/fetch',
        );
    }

    const httpClient = new x402Fetch.x402HTTPClient(x402Client as never);
    const payClient = x402Client as { createPaymentPayload(req: unknown): Promise<unknown> };

    const httpUrl = wsUrl.replace(/^wss:\/\//, "https://").replace(/^ws:\/\//, "http://");

    const response = await fetch(httpUrl);
    if (response.status !== 402) {
        const body = await response.text();
        throw new Error(`x402: expected 402 from ${httpUrl} but got ${response.status}: ${body || "(empty)"}`);
    }

    let body: unknown;
    try {
        body = JSON.parse(await response.text());
    } catch {
        body = undefined;
    }

    const getHeader = (name: string): string | null => response.headers.get(name);
    const paymentRequired = httpClient.getPaymentRequiredResponse(getHeader, body);
    const paymentPayload = await payClient.createPaymentPayload(paymentRequired);
    return httpClient.encodePaymentSignatureHeader(paymentPayload);
}
