import { WebsocketsClient as FernWebsocketsClient } from "../api/resources/websockets/client/Client.js";
import { WebsocketsSocket } from "../api/resources/websockets/client/Socket.js";
import { Supplier } from "../core/index.js";

export class WebsocketsClient extends FernWebsocketsClient {
  public override async connect(
    args: FernWebsocketsClient.ConnectArgs = {},
  ): Promise<WebsocketsSocket> {
    if (!args.apiKey) {
      const apiKey =
        (await Supplier.get(this._options.apiKey)) ??
        process.env.AGENTMAIL_API_KEY;
      return super.connect({ ...args, apiKey });
    }
    return super.connect(args);
  }
}
