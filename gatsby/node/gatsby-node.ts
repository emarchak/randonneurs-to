import { GatsbyNode } from 'gatsby'
import { createNewslettersPages, createNewsletterNodes } from '../source/sendGrid'

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
    createNewsletterNodes(...args)
  ]);
}

export const createPages: GatsbyNode['createPages'] = async (...args) => {
  await Promise.all([
    // Newsletters
    createNewslettersPages(...args)
  ]);
}
