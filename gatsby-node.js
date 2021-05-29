const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        module: {
            rules: [
              {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader',
              },
            ],
          },
        resolve: {
            alias: {
                'src': path.resolve(__dirname, 'src/')
            }
        }
    })
}