declare module "@x402/fetch" {
    export class x402Client {}

    export class x402HTTPClient {
        constructor(client: x402Client);

        getPaymentRequiredResponse(getHeader: (name: string) => string | null | undefined, body?: unknown): unknown;

        encodePaymentSignatureHeader(paymentPayload: unknown): Record<string, string>;

        createPaymentPayload(paymentRequired: unknown): Promise<unknown>;
    }

    export function wrapFetchWithPayment(
        fetch: typeof globalThis.fetch,
        client: x402Client | x402HTTPClient,
    ): typeof globalThis.fetch;
}
