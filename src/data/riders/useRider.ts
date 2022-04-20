import { useQuery } from 'react-query'
import { request } from "graphql-request"
import getMembership from './api/getMembership.gql'
import { Query_Root } from 'src/graphql.gql.d'


export const useRider = ({ riderName }: { riderName?: string }) => {
  const { data, isLoading } = useQuery(['findMembership', riderName], async (): Promise<Query_Root | null> => {
    if (!riderName) return null

    const query = await request(
      'https://randonneurs-to.hasura.app/v1/graphql',
      getMembership,
      { riderName }
    )
    return query

  })

  const rider = data?.memberships?.find(m => m.riderName === riderName)

  return ({
    data: rider,
    isLoading
  })
}
