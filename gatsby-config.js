/* eslint-disable no-undef */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  flags: { DEV_SSR: true },
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
      resolve: 'gatsby-source-google-spreadsheets',
      options: {
        spreadsheetId: '1KUxsyTLQERX43VAiKMR_LKvIpwzGeoOEcHuRKUvmjOM',
        credentials: {
          type: 'service_account',
          project_id: 'randonneurs-to',
          private_key_id: process.env.GS_PRIVATE_KEY_ID,
          private_key: process.env.GS_PRIVATE_KEY.replace(/(\\r)|(\\n)/g, '\n'),
          client_email: 'randonneurstosheets@randonneurs-to.iam.gserviceaccount.com',
          client_id: '116465140767443102500',
          auth_uri: 'https://accounts.google.com/o/oauth2/auth',
          token_uri: 'https://oauth2.googleapis.com/token',
          auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
          client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/randonneurs-to%40appspot.gserviceaccount.com`,
        },
      },
    },
  ],
}
/* eslint-enable no-undef */
