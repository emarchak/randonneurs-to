import { getSingleSends, getSingleSend } from "functions/send-mail/api"
import { snakeToCamelKeys } from "src/utils/text"

const SEND_NODE_TYPE = 'mail'

const category = 'randolist'

export const sourceNodes = async (api) => {
  const {
    actions: { createNode },
    createContentDigest,
    createNodeId,
  } = api

  try {
    const response = await getSingleSends()

    const singleSends = response.filter((singleSend) => (category ? singleSend.categories.includes(category) : true)
      && singleSend.status === 'triggered')

    const fullData = await Promise.all(singleSends.map(async ({ id }) => {
      const response = await getSingleSend(id)
      return response
    }))

    fullData.map(snakeToCamelKeys).forEach((data) => {
      const { emailConfig, sendTo, ...mailData } = data

      const send = {
        ...mailData,
        ...snakeToCamelKeys(emailConfig),
      }

      createNode({
        ...send,
        id: send.id,
        internal: {
          type: SEND_NODE_TYPE,
          content: JSON.stringify(send),
          contentDigest: createContentDigest(send),
        },
      })
    })
    console.log(`gatsby-source-sendgrid result Created ${response.length} ${SEND_NODE_TYPE}`)
  } catch (error) {
    console.error(error)
  }
}

export const createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  // const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)

  return graphql(`
    query loadMailQuery {
      allMail {
        nodes {
          htmlContent
          createdAt
          name
          subject
          id
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog post pages.
    result.data.allMail.nodes.forEach(mail => {
      createPage({
        // Path for this page — required
        path: encodeURIComponent(mail.name),
        component:
        context: {
          ...mail
        },
      })
    })
  })
}
