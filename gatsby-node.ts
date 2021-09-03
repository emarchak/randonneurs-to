import { GatsbyNode } from 'gatsby'
import path from 'path'
import getSendsByCategory, { createNode as createSendNode, nodeType as sendNodeType } from './source/sendGrid'

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions }) => {
  actions.setWebpackConfig({
      module: {
          rules: [
            {
              test: /\.(graphql|gql)$/,
              exclude: /node_modules/,
              loader: 'graphql-tag/loader',
            },
          ],
        }
  })
}

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions
  try {
    const singleSends = await getSendsByCategory('randolist')
    singleSends.map(createSendNode).forEach(send => {
      createNode({
        ...send,
        id: createNodeId(send.id),
        internal: {
          type: sendNodeType,
          contentDigest: createContentDigest(send),
        },
      })
    })
  } catch(err) {
    console.error(err)
  }
}

export const createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(`
    query loadMailQuery {
      allMail {
        nodes {
          categories
          name
          subject
          sentAt
          htmlContent
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    result.data.allMail.nodes.forEach(mail => {
      createPage({
        path: `${sendNodeType}/${encodeURIComponent(mail.name.toLowerCase())}`,
        component: path.resolve('./src/components/Newsletters/Newsletter.tsx'),
        context: {
          ...mail
        },
      })
    })
  })
}
