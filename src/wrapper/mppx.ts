import type { Mppx } from "mppx/client";
import { probe402 } from "./probe402.js";

export async function getPaymentCredentials(wsUrl: string, mppx: Mppx.Mppx): Promise<Record<string, string>> {
    const response = await probe402(wsUrl);

    const credential = await mppx.createCredential(response);
    const signed = mppx.transport.setCredential(new Request(wsUrl), credential);

    const headers: Record<string, string> = {};
    signed.headers.forEach((value, key) => {
        headers[key] = value;
    });
    return headers;
}
