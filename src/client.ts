import { z } from 'zod'

import { CreateInboxSchema, InboxSchema, EmailsSchema, EmailSchema, SendEmailSchema } from './schemas'

class ClientError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ClientError'
    }
}

class ServerError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ServerError'
    }
}

export class AgentMail {
    constructor(private readonly baseUrl: string) {}

    private async request<T>(method: string, path: string, body?: unknown): Promise<T> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method,
            headers: body ? { 'Content-Type': 'application/json' } : undefined,
            body: body ? JSON.stringify(body) : undefined,
        })

        if (response.status === 204) return {} as T

        const data = await response.json()

        if (response.status >= 400 && response.status < 500) throw new ClientError(data.message)
        if (response.status >= 500) throw new ServerError(data.message)

        return data as T
    }

    async createInbox(options?: z.infer<typeof CreateInboxSchema>) {
        const response = await this.request('POST', '/inboxes', options)
        return InboxSchema.parse(response)
    }

    async deleteInbox(address: string) {
        await this.request('DELETE', `/inboxes/${address}`)
        return 'Success'
    }

    async getEmails(address: string) {
        const response = await this.request('GET', `/inboxes/${address}/emails`)
        return EmailsSchema.parse(response)
    }

    async getEmail(address: string, id: string) {
        const response = await this.request('GET', `/inboxes/${address}/emails/${id}`)
        return EmailSchema.parse(response)
    }

    async getSentEmails(address: string) {
        const response = await this.request('GET', `/inboxes/${address}/sent`)
        return EmailsSchema.parse(response)
    }

    async getSentEmail(address: string, id: string) {
        const response = await this.request('GET', `/inboxes/${address}/sent/${id}`)
        return EmailSchema.parse(response)
    }

    async sendEmail(address: string, options?: z.infer<typeof SendEmailSchema>) {
        await this.request('POST', `/inboxes/${address}/sent`, options)
        return 'Success'
    }

    async replyToEmail(address: string, id: string, options?: z.infer<typeof SendEmailSchema>) {
        await this.request('POST', `/inboxes/${address}/emails/${id}/reply`, options)
        return 'Success'
    }
}
