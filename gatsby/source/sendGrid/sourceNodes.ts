import { GatsbyNode } from "gatsby"
import { nodeType } from "."
import { SingleSend } from "./api"
import { getSendsByCategory } from "./getSendsByCategory"

type Mail = {
  id: SingleSend['id']
  categories: SingleSend['categories']
  content: SingleSend['email_config']['html_content']
  subject: SingleSend['email_config']['subject']
  name: SingleSend['name']
  sentAt: Date
  teaser: string
}

export const createMail = (send: SingleSend) => ({
  id: send.id,
  categories: send.categories,
  content: send.email_config.html_content,
  teaser: send.email_config.plain_content.match(/(.{280}[^\s]*)/).pop(),
  subject: send.email_config.subject,
  name: send.name,
  sentAt: new Date(send.send_at)
})

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions
  try {
    const singleSends = await getSendsByCategory('randolist')
    singleSends.map(createMail).forEach((mail: Mail) => {
      createNode({
        ...mail,
        id: createNodeId(mail.id),
        internal: {
          type: nodeType,
          contentDigest: createContentDigest(mail),
        },
      })
    })
  } catch(err) {
    console.error(err)
  }
}
