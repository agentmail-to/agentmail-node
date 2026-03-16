export function wsToHttp(wsUrl: string): string {
    return wsUrl.replace(/^wss:\/\//, "https://").replace(/^ws:\/\//, "http://");
}

export async function probe402(wsUrl: string, fetchFn: typeof fetch = fetch): Promise<Response> {
    const httpUrl = wsToHttp(wsUrl);

    const response = await fetchFn(httpUrl);
    if (response.status !== 402) {
        throw new Error(`Expected 402 from ${httpUrl} but got ${response.status}`);
    }

    return response;
}
