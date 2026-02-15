// Type declarations for @x402/fetch (optional peer dependency, dynamically imported)

declare module "@x402/fetch" {
    export function wrapFetchWithPayment(
        fetch: typeof globalThis.fetch,
        client: unknown,
    ): typeof globalThis.fetch;
    export class x402HTTPClient {
        constructor(client: unknown);
        getPaymentRequiredResponse(getHeader: (name: string) => string | null, body: unknown): unknown;
        encodePaymentSignatureHeader(payload: unknown): Record<string, string>;
    }
}
