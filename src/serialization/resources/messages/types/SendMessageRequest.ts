/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as AgentMail from "../../../../api/index";
import * as core from "../../../../core";
import { SendMessageTo } from "./SendMessageTo";
import { SendMessageCc } from "./SendMessageCc";
import { SendMessageBcc } from "./SendMessageBcc";
import { MessageSubject } from "./MessageSubject";
import { MessageText } from "./MessageText";
import { MessageHtml } from "./MessageHtml";

export const SendMessageRequest: core.serialization.ObjectSchema<
    serializers.SendMessageRequest.Raw,
    AgentMail.SendMessageRequest
> = core.serialization.object({
    to: SendMessageTo,
    cc: SendMessageCc.optional(),
    bcc: SendMessageBcc.optional(),
    subject: MessageSubject.optional(),
    text: MessageText.optional(),
    html: MessageHtml.optional(),
});

export declare namespace SendMessageRequest {
    export interface Raw {
        to: SendMessageTo.Raw;
        cc?: SendMessageCc.Raw | null;
        bcc?: SendMessageBcc.Raw | null;
        subject?: MessageSubject.Raw | null;
        text?: MessageText.Raw | null;
        html?: MessageHtml.Raw | null;
    }
}
