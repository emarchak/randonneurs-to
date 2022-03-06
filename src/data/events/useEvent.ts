import React from 'react'
import { useQuery } from 'react-query'
import { request, gql } from "graphql-request"

export const useEvent = (scheduleId: number) => (useQuery(['findEvent', scheduleId], async () => {
  const { events } = await request(
    process.env.GRAPHQL_URL,
    gql`
      query findEvent {
        events (where: {event_id: {_eq: ${scheduleId}}}) {
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
}))
