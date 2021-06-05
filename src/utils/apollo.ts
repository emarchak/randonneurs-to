import ApolloClient from "apollo-boost"
import fetch from "isomorphic-unfetch"

const useProxy = process.env.NODE_ENV !== 'development'

const uri = useProxy ? "/.netlify/functions/graphql-proxy" : process.env.GRAPHQL_URL
const headers = useProxy ? undefined : {
    [`${process.env.GRAPHQL_SECRETKEY}`]: process.env.GRAPHQL_SECRET,
}

export const apolloClient = new ApolloClient({
    name: `gastby-apollo@${process.env.NODE_ENV}`,
    uri,
    headers,
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