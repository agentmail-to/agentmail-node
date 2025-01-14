import { z } from 'zod'

import { InboxParamsSchema } from './inbox'

export const EmailParamsSchema = InboxParamsSchema.extend({
    id: z.string(),
})

export const EmailsQuerySchema = z
    .object({
        limit: z
            .string()
            .transform((val) => parseInt(val))
            .optional(),
        last_key: z.string().optional(),
    })
    .optional()

const AddressesSchema = z.union([z.string().email(), z.array(z.string().email())]) // TODO: Add name

export const SendEmailSchema = z.object({
    to: AddressesSchema.optional(),
    cc: AddressesSchema.optional(),
    bcc: AddressesSchema.optional(),
    subject: z.string().optional(),
    text: z.string().optional(),
})

export const EmailAddressSchema = z.object({
    address: z.string().email(),
    name: z.string().optional(),
})

export const EmailsSchema = z.object({
    emails: z.array(
        z.object({
            id: z.string(),
            timestamp: z.string(),
            from: EmailAddressSchema,
            to: z.array(EmailAddressSchema).optional(),
            subject: z.string().optional(),
            text: z.string().optional(),
        })
    ),
    count: z.number(),
    limit: z.number(),
    last_key: z.string().optional(),
})

export const EmailSchema = z.object({
    id: z.string(),
    timestamp: z.string(),
    from: EmailAddressSchema,
    reply_to: EmailAddressSchema.optional(),
    to: z.array(EmailAddressSchema).optional(),
    cc: z.array(EmailAddressSchema).optional(),
    bcc: z.array(EmailAddressSchema).optional(),
    subject: z.string().optional(),
    text: z.string().optional(),
    html: z.string().optional(),
    message_id: z.string().optional(),
    in_reply_to: z.string().optional(),
    references: z.array(z.string()).optional(),
    created_at: z.string().optional(),
})

export type EmailAddress = z.infer<typeof EmailAddressSchema>
export type Email = z.infer<typeof EmailSchema>
