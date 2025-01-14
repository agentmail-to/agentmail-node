import { z } from 'zod'

import { DomainSchema } from './domain'

export const InboxParamsSchema = z.object({
    address: z
        .string()
        .email()
        .transform((val) => val.toLowerCase()),
})

export const CreateInboxSchema = z.object({
    username: z
        .string()
        .regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/, 'Invalid username format')
        .min(1, 'Username cannot be empty')
        .transform((val) => val.toLowerCase())
        .optional(),
    domain: DomainSchema.optional(),
})

export const InboxSchema = z.object({
    address: z.string().email(),
})
