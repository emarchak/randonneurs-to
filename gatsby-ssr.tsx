import React from "react"
import { ApolloProvider } from "@apollo/react-hooks";
import { apolloClient } from "./src/utils";

export const wrapRootElement = ({ element }) =>  (
    <ApolloProvider client={apolloClient}>
        {element}
    </ApolloProvider>
)
