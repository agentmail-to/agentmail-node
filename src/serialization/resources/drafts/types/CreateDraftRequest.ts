/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as AgentMail from "../../../../api/index";
import * as core from "../../../../core";
import { DraftLabels } from "./DraftLabels";
import { DraftReplyTo } from "./DraftReplyTo";
import { DraftTo } from "./DraftTo";
import { DraftCc } from "./DraftCc";
import { DraftBcc } from "./DraftBcc";
import { DraftSubject } from "./DraftSubject";
import { DraftText } from "./DraftText";
import { DraftHtml } from "./DraftHtml";

export const CreateDraftRequest: core.serialization.ObjectSchema<
    serializers.CreateDraftRequest.Raw,
    AgentMail.CreateDraftRequest
> = core.serialization.object({
    labels: DraftLabels.optional(),
    replyTo: core.serialization.property("reply_to", DraftReplyTo.optional()),
    to: DraftTo.optional(),
    cc: DraftCc.optional(),
    bcc: DraftBcc.optional(),
    subject: DraftSubject.optional(),
    text: DraftText.optional(),
    html: DraftHtml.optional(),
});

export declare namespace CreateDraftRequest {
    export interface Raw {
        labels?: DraftLabels.Raw | null;
        reply_to?: DraftReplyTo.Raw | null;
        to?: DraftTo.Raw | null;
        cc?: DraftCc.Raw | null;
        bcc?: DraftBcc.Raw | null;
        subject?: DraftSubject.Raw | null;
        text?: DraftText.Raw | null;
        html?: DraftHtml.Raw | null;
    }
}
