import { useQuery } from 'react-query'
import { request, gql } from "graphql-request"

export const useEvent = (eventId: number) => {
  const query = useQuery(['findEvent', eventId], async () => {
    const { events } = await request(
      process.env.GRAPHQL_URL,
      gql`
        query findEvent {
          events (where: {event_id: {_eq: ${eventId}}}) {
            riders {
              rider {
                riderName
              }
            }
            name
          }
        }
      `
    )
    return events?.pop()
  })

  return {
    ...query,
  }
}

