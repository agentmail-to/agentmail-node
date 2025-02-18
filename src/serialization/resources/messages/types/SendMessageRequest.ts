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
import { Addresses } from "./Addresses";

export const SendMessageRequest: core.serialization.ObjectSchema<
    serializers.SendMessageRequest.Raw,
    AgentMail.SendMessageRequest
> = core.serialization.object({
    to: SendMessageTo,
    cc: SendMessageCc,
    bcc: SendMessageBcc,
    subject: MessageSubject,
    text: MessageText,
    html: MessageHtml,
});

export declare namespace SendMessageRequest {
    export interface Raw {
        to: SendMessageTo.Raw;
        cc?: SendMessageCc.Raw;
        bcc?: SendMessageBcc.Raw;
        subject?: MessageSubject.Raw;
        text?: MessageText.Raw;
        html?: MessageHtml.Raw;
    }
}
