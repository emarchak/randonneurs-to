import { useState, useEffect, useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Brevet } from '../types'

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
