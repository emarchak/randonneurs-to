import ApolloClient from "apollo-boost"
import fetch from "isomorphic-unfetch"

const headers = {
    [`${process.env.GRAPHQL_SECRETKEY}`]: process.env.GRAPHQL_SECRET,
}

export const apolloClient = new ApolloClient({
    name: 'gastby-apollo',
    uri: process.env.GRAPHQL_URL,
    fetch,
    request: (operation) => {
        operation.setContext({ headers })
    },
    onError: ({ networkError, graphQLErrors }) => {
        if (graphQLErrors) {
            console.warn('graphQLErrors', graphQLErrors)
        }
        if (networkError) {
            console.warn('networkError', networkError)
        }
    },
})