export interface X402Initialized {
    fetch: typeof fetch;
    httpClient: {
        getPaymentRequiredResponse(getHeader: (name: string) => string | null, body: unknown): unknown;
        encodePaymentSignatureHeader(payload: unknown): Record<string, string>;
    };
    payClient: {
        createPaymentPayload(paymentRequired: unknown): Promise<unknown>;
    };
}

/**
 * Initializes x402 fetch wrapper and HTTP client from an x402Client instance.
 * Dynamically imports @x402/fetch so it's only needed when x402 is used.
 */
export async function initX402(x402Client: unknown): Promise<X402Initialized> {
    let x402Fetch: typeof import("@x402/fetch");
    try {
        x402Fetch = await import("@x402/fetch");
    } catch {
        throw new Error(
            'The x402 option requires @x402/fetch to be installed. Run: npm install @x402/fetch',
        );
    }
    const wrappedFetch = x402Fetch.wrapFetchWithPayment(fetch, x402Client as never);
    const httpClient = new x402Fetch.x402HTTPClient(x402Client as never);
    return {
        fetch: wrappedFetch as typeof fetch,
        httpClient,
        payClient: x402Client as X402Initialized["payClient"],
    };
}

/**
 * Probes a WebSocket endpoint over HTTP to get a 402 response,
 * then signs a payment and returns the headers needed for the WS handshake.
 */
export async function getPaymentHeaders(wsUrl: string, x402: X402Initialized): Promise<Record<string, string>> {
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
    const paymentRequired = x402.httpClient.getPaymentRequiredResponse(getHeader, body);
    const paymentPayload = await x402.payClient.createPaymentPayload(paymentRequired);
    const headers = x402.httpClient.encodePaymentSignatureHeader(paymentPayload);
    return headers;
}
