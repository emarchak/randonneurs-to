import { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

export type Chapter = 'Toronto' | 'Huron' | 'Ottawa' | 'Simcoe' | 'Other'

export type RideType = 'Brevet' | 'Permanent' | 'Fleche' | 'Populaire' | 'Other'

export type Event = {
  chapter: Chapter
  distance: number
  eventType: RideType
  id: string
  organizer: string
  route: string
  rwgpsUrl: string
  rwgpsId: number
  season: number
  startLocation: string
  date: Date
  path: string
}

export const brevetQuery = graphql`
query {
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
  } = useStaticQuery(brevetQuery)

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
    brevets: filteredEvents
  }
}
