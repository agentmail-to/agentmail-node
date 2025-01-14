import { AgentMail } from './client'

const BASE_URL = 'https://api.agentmail.dev'
const USERNAME = 'test'
const DOMAIN = 'agentmail.dev'

const sleep = (seconds: number) => new Promise((resolve) => setTimeout(resolve, seconds * 1000))

const main = async () => {
    const client = new AgentMail(BASE_URL)

    let status = await client.deleteInbox(`${USERNAME}@${DOMAIN}`)
    console.log(status, '\n')

    const inbox = await client.createInbox({ username: USERNAME, domain: DOMAIN })
    console.log(inbox, '\n')

    await sleep(3)

    let emails = await client.getEmails(inbox.address)
    console.log(emails, '\n')

    let email = await client.getEmail(inbox.address, emails.emails[0].id)
    console.log(email, '\n')

    status = await client.sendEmail(inbox.address, {
        to: inbox.address,
        subject: 'Send subject',
        text: 'Send body',
    })
    console.log(status, '\n')

    let sentEmails = await client.getSentEmails(inbox.address)
    console.log(sentEmails, '\n')

    let sentEmail = await client.getSentEmail(inbox.address, sentEmails.emails[0].id)
    console.log(sentEmail, '\n')

    await sleep(3)

    emails = await client.getEmails(inbox.address)
    console.log(emails, '\n')

    email = await client.getEmail(inbox.address, emails.emails[0].id)
    console.log(email, '\n')

    status = await client.replyToEmail(inbox.address, emails.emails[0].id, {
        text: 'Reply body',
    })
    console.log(status, '\n')

    sentEmails = await client.getSentEmails(inbox.address)
    console.log(sentEmails, '\n')

    sentEmail = await client.getSentEmail(inbox.address, sentEmails.emails[0].id)
    console.log(sentEmail, '\n')

    emails = await client.getEmails(inbox.address)
    console.log(emails, '\n')

    email = await client.getEmail(inbox.address, emails.emails[0].id)
    console.log(email, '\n')

    await sleep(3)

    status = await client.deleteInbox(inbox.address)
    console.log(status, '\n')
}

main()
