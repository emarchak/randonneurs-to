import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"
import { apolloClient } from "./src/utils"
import MockDate from 'mockdate'

export const wrapRootElement = ({ element }) =>  {
  const isSnapshot = process.env.IS_SNAPSHOT
  if (isSnapshot) {
    MockDate.set(new Date('01/01/2021 12:01:00'))
  }

  return (
    <ApolloProvider client={apolloClient}>
      {element}
    </ApolloProvider>
)}
