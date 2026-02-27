import { probe402 } from "./probe402.js";

export interface MppxClient {
    fetch: typeof globalThis.fetch;
    transport: {
        setCredential(request: Request, credential: string): Request;
    };
    createCredential(response: Response): Promise<string>;
}

export async function getPaymentCredentials(wsUrl: string, mppx: MppxClient): Promise<Record<string, string>> {
    const response = await probe402(wsUrl);

    const credential = await mppx.createCredential(response);
    const signed = mppx.transport.setCredential(new Request(wsUrl), credential);

    const headers: Record<string, string> = {};
    signed.headers.forEach((value: string, key: string) => {
        headers[key] = value;
    });
    return headers;
}
