import { GatsbyNode } from 'gatsby'
import { resolve } from 'path'
import { nodeType } from '.'

const buildPath = mail => [nodeType, ...mail.categories, encodeURIComponent(mail.name.toLowerCase().replace(' ', '-'))].join('/')

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
  query loadMailQuery {
    allMail {
      nodes {
        id
        categories
        name
      }
    }
  }
  `)

  if (result.errors) {
    console.error(result.errors)
    return
  }

  const {allMail: {nodes = []}} = result.data as any

  nodes.forEach((mail, i) => {
    createPage({
      path: buildPath(mail),
      component: resolve('src/templates/Newsletter.tsx'),
      context: {
        id: mail.id,
        type: nodeType,
        pageInfo: {
          title: mail.name,
          prevUrl: i === 0 ? null : buildPath(nodes[i - 1]),
          prevTitle: nodes[i - 1]?.name || null,
          nextUrl: i === nodes.length - 1 ? null : buildPath(nodes[i + 1]),
          nextTitle: nodes[i + 1]?.name || null,
        }
      },
    })
  })
}
