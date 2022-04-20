import { useQuery } from 'react-query'
import { request } from "graphql-request"
import getMemberships from './api/getMemberships.gql'
import { GetMembershipsQuery } from 'src/graphql.gql'

type MemberType = 'Individual' | 'Family' | 'Trial'
export type Rider = {
  id: string,
  city: string,
  country: string,
  fullName: string,
  membership: MemberType,
  seasons: Number[]
}

const normalize = str => str.toLowerCase().replace(/\s|-|'|’|(\(.*\))/g, '')

export const useRiders = () => {
  const { data, isLoading } = useQuery(['findMembership'], async (): Promise<GetMembershipsQuery | null> => {
    const query = await request(
      'https://randonneurs-to.hasura.app/v1/graphql',
      getMemberships,
    )
    return query
  })

  return ({
    data,
    isLoading,
  })
}
