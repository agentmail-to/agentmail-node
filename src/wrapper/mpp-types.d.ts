declare module "mppx/client" {
    export namespace Mppx {
        type Mppx = {
            fetch: typeof globalThis.fetch;
            transport: {
                setCredential(request: Request, credential: string): Request;
            };
            createCredential(response: Response): Promise<string>;
        };
    }
}
