import { Handler } from '@netlify/functions'
import { ApolloServer, gql, } from 'apollo-server-lambda'
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
    riderName: String,
    type: MembershipType
  }
  input QueryInput {riderName: String},
  type Query {
    memberships(where: QueryInput): [Membership]
  }
`

const resolvers = {
  Query: {
    memberships: async (parent, { where }) => {
      try {
        const memberships = await getMemberships({ search: where?.riderName })
        return memberships
      } catch (error) {
        throw new Error(error)
      }
    }
  }
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

