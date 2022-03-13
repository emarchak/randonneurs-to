import { useQuery } from 'react-query'
import { request } from "graphql-request"
import findEvent from './api/findEvent.gql'

export const useEvent = (eventId: number) => {
  const query = useQuery(['findEvent', eventId], async () => {
    const { events } = await request(
      process.env.GRAPHQL_URL,
      findEvent,
      { eventId }
    )
    return events?.pop()
  })

  return {
    ...query,
  }
}

