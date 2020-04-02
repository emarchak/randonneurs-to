/* eslint-disable no-undef */
module.exports = {
  siteMetadata: {
    title: 'Toronto Randonneurs',
    description: 'Automations for Randonneurs Toronto',
    author: '@emarchak',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sass',
    'gatsby-transformer-typescript-css-modules',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['EB Garamond', 'Dawning of a New Day', 'Roboto:400,400i,700'],
        },
      },
    },
  ],
};
/* eslint-enable no-undef */
