import { GatsbyNode } from 'gatsby'
import { createNewslettersPages, sourceNewsletterNodes } from '../source/sendGrid'
import { createEventPages, createEventSchemaCustomization, sourceEventNodes } from '../source/randOnt'

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

export const sourceNodes: GatsbyNode['sourceNodes'] = async (...args) => {
  await Promise.all([
    // Newsletters
    sourceNewsletterNodes(...args),
    // Events
    sourceEventNodes(...args)
  ])
}

export const createPages: GatsbyNode['createPages'] = async (...args) => {
  await Promise.all([
    // Newsletters
    createNewslettersPages(...args),
    // Events
    createEventPages(...args)
  ])
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = (...args) => {
  createEventSchemaCustomization(...args)
}
