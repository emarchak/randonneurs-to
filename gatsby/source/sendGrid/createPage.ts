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
        categories
        name
        subject
        sentAt
        content
        teaser
      }
    }
  }
  `)

  if (result.errors) {
    throw result.errors
  }

  const {allMail: {nodes = []}} = result.data as any

  nodes.forEach((mail, i) => {
    createPage({
      path: buildPath(mail),
      component: resolve('src/templates/Newsletter.tsx'),
      context: {
        ...mail,
        pageInfo: {
          prevUrl: i === 0 ? null : buildPath(nodes[i - 1]),
          nextUrl: i === nodes.length - 1 ? null : buildPath(nodes[i + 1])
        }
      },
    })
  })
}
