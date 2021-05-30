import ApolloClient from "apollo-boost"
import fetch from "isomorphic-unfetch"

export const apolloClient = new ApolloClient({
    name: 'gastby-apollo',
    uri: process.env.GRAPHQL_URL,
    headers: {
        [`${process.env.GRAPHQL_SECRETKEY}`]: process.env.GRAPHQL_SECRET,
    },
    fetch,
    onError: ({ networkError, graphQLErrors }) => {
        if (graphQLErrors) {
            console.warn('graphQLErrors', graphQLErrors)
        }
        if (networkError) {
            console.warn('networkError', networkError)
        }
    },
})