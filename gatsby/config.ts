
import dotenv, { } from 'dotenv'
import { resolve } from 'path'

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
})

export const flags = {
  FAST_DEV: false
}

export const siteMetadata = {
  title: 'Toronto Randonneurs',
  description: "The Toronto Randonneurs are a chapter of Randonneurs Ontario ultra-distance cycling club. We've been riding long distance rides from of Toronto and southern Ontario since 1982.",
  author: '@emarchak',
  siteURL: 'https://randonneurs.to',
}

export const plugins = [
  'gatsby-plugin-netlify',
  'gatsby-plugin-root-import',
  'gatsby-plugin-typescript',
  'gatsby-transformer-sharp',
  'gatsby-plugin-sharp',
  'gatsby-plugin-image',
  'gatsby-plugin-sass',
  {
    resolve: 'gatsby-source-rss-feed',
    options: {
      url: 'https://blog.randonneursontario.ca/?feed=rss2',
      name: 'blog',
    }
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: resolve('src/images'),
    },
  },
  {
    resolve: 'gatsby-plugin-web-font-loader',
    options: {
      google: {
        families: [
          'EB Garamond:400,400i,700,800',
          'Dawning of a New Day',
          'Roboto:400,400i,700',
        ],
      },
    },
  },
  {
    resolve: 'gatsby-plugin-google-gtag',
    options: {
      trackingIds: [
        process.env.GTAG_ID
      ],
    },
  },
  {
    resolve: 'gatsby-source-graphql',
    options: {
      typeName: 'db',
      fieldName: 'db',
      url: process.env.GRAPHQL_URL,
    },
  },
]
