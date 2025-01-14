import { z } from 'zod'

// TODO: Add regex validation
export const DomainSchema = z
    .string()
    .min(1, 'Domain cannot be empty')
    .transform((val) => val.toLowerCase())
