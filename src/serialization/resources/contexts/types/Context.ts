/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as AgentMail from "../../../../api/index";
import * as core from "../../../../core";
import { ContextId } from "./ContextId";
import { ContextType } from "./ContextType";
import { ContextData } from "./ContextData";
import { ContextMetadata } from "./ContextMetadata";
import { ContextIsEvent } from "./ContextIsEvent";

export const Context: core.serialization.ObjectSchema<serializers.Context.Raw, AgentMail.Context> =
    core.serialization.object({
        contextId: core.serialization.property("context_id", ContextId),
        type: ContextType,
        data: ContextData,
        metadata: ContextMetadata.optional(),
        isEvent: core.serialization.property("is_event", ContextIsEvent),
        updatedAt: core.serialization.property("updated_at", core.serialization.date()),
        createdAt: core.serialization.property("created_at", core.serialization.date()),
    });

export declare namespace Context {
    export interface Raw {
        context_id: ContextId.Raw;
        type: ContextType.Raw;
        data: ContextData.Raw;
        metadata?: ContextMetadata.Raw | null;
        is_event: ContextIsEvent.Raw;
        updated_at: string;
        created_at: string;
    }
}
