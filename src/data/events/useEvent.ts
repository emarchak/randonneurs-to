import { useEffect, useState } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { request } from "graphql-request"
import findEvent from './api/findEvent.gql'


export const useEvent = (eventId: number) => {
  const [query, setQuery] = useState<UseQueryResult>(null)

  useEffect(() => {
    const query = useQuery(['findEvent', eventId], async () => {
      const { events } = await request(
        process.env.GRAPHQL_URL,
        findEvent,
        { eventId }
      )
      return events?.pop()
    })

    setQuery(query)
  }, [])


  return {
    isLoading: query?.isLoading || true,
    ...query,
  }
}

