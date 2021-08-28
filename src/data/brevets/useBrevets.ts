import { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

export type Chapter = 'Toronto' | 'Huron' | 'Ottawa' | 'Simcoe'

export type RideType = 'brevet' | 'permanent' | 'fleche' | 'populaire'

export type Brevet = {
  chapter: Chapter
  distance: number
  event: RideType
  id: string
  organizer: string
  route: string
  rwgpsUrl: string
  rwgpsId: number
  season: number
  startLocation: string
  date: Date
}

const brevetQuery = graphql`
query {
  allEvent(filter: {season: {gte:2021}}) {
    nodes {
      chapter
      distance
      event
      id
      organizer
      route
      rwgpsUrl
      startLocation
      date
    }
  }
}
`

type UseBrevetFilters = {
  chapter?: Brevet['chapter'],
  after?: Date,
  limit?: number
}

const sortBrevetsAsc = (a: Brevet, b: Brevet) => (a.date < b.date ? -1 : 1)

export const useBrevets = ({ chapter, after = new Date(Date.now()), limit = 20 }: UseBrevetFilters) => {
  const {
    allEvent: { nodes: events }
  } = useStaticQuery(brevetQuery)

  const filteredEvents: Brevet[] = useMemo(() => events.map((event: Brevet) => ({
      ...event,
      date: new Date(event.date)
    })).sort(sortBrevetsAsc).filter((event: Brevet) => {
      const matchDate = new Date(event.date) > after
      const matchChapter = chapter ? event.chapter === chapter : true
      return matchDate && matchChapter
  }).slice(0, limit), [chapter, after, limit])

  return {
    loading: false,
    brevets: filteredEvents
  }
}
