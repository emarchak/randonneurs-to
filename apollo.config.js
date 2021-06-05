const env = process.env.NODE_ENV || 'development'

require("dotenv").config({
    path: `.env.${env}`,
})

module.exports = {
    client: {
        service: {
            name: `gastby-apollo@${env}`,
            uri: process.env.GRAPHQL_URL,
            localSchemaFile: 'schema.graphql.json'
        }
    }
}