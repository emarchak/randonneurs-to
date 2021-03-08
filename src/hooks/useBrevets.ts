import { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

export type Chapter = 'Toronto' | 'Huron' | 'Ottawa' | 'Simcoe'

export type RideType = 'brevet' | 'permanent' | 'fleche' | 'populaire'

export type Route = {
  chapter: Chapter
  distance: number
  startLocation: string
  routeName: string
  id: string
}

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

const today = new Date(Date.now())

const brevetQuery = graphql`
query {
  allEvent(filter: {season: {gte:2021}}) {
    nodes {
      chapter
      contact
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
  before?: Date,
}

export const useBrevets = ({ chapter, before = today }: UseBrevetFilters) => {
  const {
    allEvent: { nodes: events }
  } = useStaticQuery(brevetQuery)

  const filteredEvents: Brevet[] = useMemo(() => events.filter((event: Brevet) => {
    const matchDate = new Date(event.date) > before
    const matchChapter = chapter ? event.chapter === chapter : true
    return matchDate && matchChapter
  }), [chapter, before])

  return {
    loading: false,
    brevets: filteredEvents
  }
}
