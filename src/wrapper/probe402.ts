export async function probe402(wsUrl: string): Promise<Response> {
    const httpUrl = wsUrl.replace(/^wss:\/\//, "https://").replace(/^ws:\/\//, "http://");

    const response = await fetch(httpUrl);
    if (response.status !== 402) {
        throw new Error(`Expected 402 from ${httpUrl} but got ${response.status}`);
    }
    return response;
}
