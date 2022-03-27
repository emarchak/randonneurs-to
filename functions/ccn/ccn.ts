import { Handler } from '@netlify/functions'
import { ApolloServer, gql, } from 'apollo-server-lambda'
import { getMembership } from './methods/getMembership'
import { getMemberships } from './methods/getMemberships'

const typeDefs = gql`
  enum MembershipType {
    Individual
    Family
    Trial
  }
  type Membership {
    id: String,
    city: String,
    country: String,
    fullName: String,
    membership: MembershipType
  }
  type Query {
    getMemberships: [Membership],
    getMembership(fullName: String!): Membership
  }
`

const resolvers = {
  Query: {
    getMemberships: async () => {
      try {
        const memberships = await getMemberships()
        return memberships
      } catch (error) {
        throw new Error(error)
      }
    },
    getMembership: async (parent, { fullName }) => {
      try {
        const membership = await getMembership({ search: fullName })
        return membership
      } catch (error) {
        throw new Error(error)
      }
    }
  },
}

export const handler: Handler = (event, context, callback) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })
  const graphqlHandler = server.createHandler()

  return graphqlHandler({
    ...event,
    requestContext: context
  }, context as any, callback)
}

