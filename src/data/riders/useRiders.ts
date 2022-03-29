import React from 'react'
import { useQuery } from 'react-query'
import { request } from "graphql-request"
import findMembership from './api/findMembership.gql'
import { FindMembershipQuery } from 'src/graphql.gql'

type MemberType = 'Individual' | 'Family' | 'Trial'
export type Rider = {
  id: string,
  city: string,
  country: string,
  fullName: string,
  membership: MemberType,
  seasons: Number[]
}

const normalize = (str: String): String => str.toLowerCase().replace(/\s|-|'|’|(\(.*\))/g, '')

export const useRiders = () => {
  const checkMembership = ({ fullName }: { fullName: string }) => {
    const riderName = normalize(fullName)
    const { data } = useQuery(['findMembership', riderName], async (): Promise<FindMembershipQuery | null> => {
      const query = await request(
        'https://randonneurs-to.hasura.app/v1/graphql',
        findMembership,
        { riderName }
      )
      return query
    })

    console.log(data)
    if (data?.memberships) {
      return data?.memberships?.pop()
    }

    return undefined
  }


  return ({ checkMembership })
}
