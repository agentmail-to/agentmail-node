/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as errors from "../../../../errors/index";
import * as AgentMail from "../../../index";

export class MessageRejectedError extends errors.AgentMailError {
    constructor(body: AgentMail.ErrorResponse) {
        super({
            message: "MessageRejectedError",
            statusCode: 403,
            body: body,
        });
        Object.setPrototypeOf(this, MessageRejectedError.prototype);
    }
}
