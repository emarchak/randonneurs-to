import { GatsbyNode } from 'gatsby'
import { createPageSchemaCustomization } from './createSchemaCustomization'
import { createNewslettersPages, sourceNewsletterNodes } from '../source/sendGrid'
import { createEventSchemaCustomization, sourceEventNodes, createEventPages } from '../source/randOnt'

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
    sourceEventNodes(...args),
  ])
}

export const createPages: GatsbyNode['createPages'] = async (...args) => {
  await Promise.all([
    // Newsletters
    createNewslettersPages(...args),
    // Calendar feeds
    createEventPages(...args),
  ])
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = (...args) => {
  // All pages
  createPageSchemaCustomization(...args)
  // Events
  createEventSchemaCustomization(...args)
}
