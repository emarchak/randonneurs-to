/* eslint-disable no-undef */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  flags: {
    DEV_SSR: true,
    PRESERVE_WEBPACK_CACHE: true,
    FAST_DEV: true
  },
  siteMetadata: {
    title: "Toronto Randonneurs",
    description: "Long distance cyclists of Toronto, Canada",
    author: "@emarchak",
    siteURL: "https://randonneurs.to",
  },
  plugins: [
    "gatsby-source-ro",
    {
      resolve: "gatsby-source-ccn",
      options: {
        ccnEndpoint: process.env.CCN_ENDPOINT,
      }
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-typescript",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-image",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: [
            "EB Garamond:400,400i,700,800",
            "Dawning of a New Day",
            "Roboto:400,400i,700",
          ],
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
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
  ],
}
/* eslint-enable no-undef */
