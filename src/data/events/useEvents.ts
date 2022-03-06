import { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { EventDataQuery } from 'src/gatsby.gql.d'
export { Chapter, EventType } from 'src/gatsby.gql.d'

export type Event = Omit<EventDataQuery['allEvent']['nodes'][0], 'date'> & { date: Date }

export const brevetQuery = graphql`
query EventData{
  allEvent {
    nodes {
      chapter
      distance
      eventType
      id
      organizer
      route
      rwgpsUrl
      startLocation
      date
      path: gatsbyPath(filePath: "/event/{event.season}/{event.route}-{event.date}")
    }
  }
}
`

type UseEventFilters = {
  chapter?: Event['chapter'],
  after?: Date,
  limit?: number | boolean,
}

const sortEventAsc = (a: Event, b: Event) => (a.date < b.date ? -1 : 1)

export const useEvents = ({ chapter, after = new Date(Date.now()), limit = 20 }: UseEventFilters) => {
  const {
    allEvent: { nodes: events }
  } = useStaticQuery<EventDataQuery>(brevetQuery)


  const filteredEvents: Event[] = useMemo(() => events.map((event: Event) => ({
    ...event,
    date: new Date(event.date)
  })).sort(sortEventAsc).filter((event: Event) => {
    const matchDate = new Date(event.date) > after
    const matchChapter = chapter ? event.chapter === chapter : true
    return matchDate && matchChapter
  }).slice(0, limit || undefined), [chapter, after, limit])

  return {
    loading: false,
    events: filteredEvents,
    brevets: filteredEvents,
  }
}
