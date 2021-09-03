import { SingleSend } from "./api"

export const nodeType = 'mail'

export const createNode = (send: SingleSend) => ({
  id: send.id,
  categories: send.categories,
  htmlContent: send.email_config.html_content,
  subject: send.email_config.subject,
  name: send.name,
  sentAt: new Date(send.send_at)
})
