import dotenv from 'dotenv'
import * as readline from 'node:readline/promises'
import { type CoreTool, tool, type CoreMessage, streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

import { AgentMail } from './client'
import { CreateInboxSchema, InboxParamsSchema, EmailParamsSchema, SendEmailSchema } from './schemas'

const BASE_URL = 'https://api.agentmail.dev'

dotenv.config()

const client = new AgentMail(BASE_URL)

const tools: Record<string, CoreTool> = {
    create_inbox: tool({
        description: 'Create email inbox',
        parameters: CreateInboxSchema,
        execute: ({ username, domain }) => client.createInbox({ username, domain }),
    }),
    delete_inbox: tool({
        description: 'Delete email inbox',
        parameters: InboxParamsSchema,
        execute: ({ address }) => client.deleteInbox(address),
    }),
    get_emails: tool({
        description: 'Get emails from inbox',
        parameters: InboxParamsSchema,
        execute: ({ address }) => client.getEmails(address),
    }),
    get_email: tool({
        description: 'Get email from inbox',
        parameters: EmailParamsSchema,
        execute: ({ address, id }) => client.getEmail(address, id),
    }),
    get_sent_emails: tool({
        description: 'Get sent emails from inbox',
        parameters: InboxParamsSchema,
        execute: ({ address }) => client.getSentEmails(address),
    }),
    get_sent_email: tool({
        description: 'Get sent email from inbox',
        parameters: EmailParamsSchema,
        execute: ({ address, id }) => client.getSentEmail(address, id),
    }),
    send_email: tool({
        description: 'Send email',
        parameters: InboxParamsSchema.merge(SendEmailSchema),
        execute: ({ address, ...options }) => client.sendEmail(address, options),
    }),
    reply_to_email: tool({
        description: 'Reply to email',
        parameters: EmailParamsSchema.merge(SendEmailSchema),
        execute: ({ address, id, ...options }) => client.replyToEmail(address, id, options),
    }),
}

async function main() {
    const terminal = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    const messages: CoreMessage[] = []

    const inbox = await client.createInbox({})
    console.log(`\nAgent inbox: ${inbox.address}\n`)

    while (true) {
        const prompt = await terminal.question('Prompt:\n\n')
        console.log('\n')

        if (['quit', 'q'].includes(prompt.toLowerCase())) {
            await client.deleteInbox(inbox.address)
            console.log('Inbox deleted\n')

            process.exit(0)
        }

        messages.push({ role: 'user', content: prompt })

        const result = streamText({
            model: openai('gpt-4o'),
            maxSteps: 5,
            system: `You are an agent that can send, receive, and manage emails. You were created by AgentMail. Your email address is ${inbox.address}.`,
            messages,
            tools,
        })

        console.log('Response:\n')

        let response = ''
        for await (const delta of result.textStream) {
            response += delta
            process.stdout.write(delta)
        }
        process.stdout.write('\n\n')

        messages.push({ role: 'assistant', content: response })
    }
}

main().catch(console.error)
