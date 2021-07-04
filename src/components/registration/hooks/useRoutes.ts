
import { graphql, useStaticQuery } from 'gatsby'
import { Chapter } from '../../../hooks/useBrevets'

export type Route = {
  chapter: Chapter
  distance: number
  startLocation: string
  name: string
  id: number
}

export const useRoutes = () => {
  const { db: { route_current } } = useStaticQuery(graphql`
    query {
      db {
        route_current(
          order_by: {chapter: asc, distance: asc}
          where: {active: {_eq: true}}
        ) {
          startLocation
          name
          id
          distance
          chapter
        }
      }
    }
  `)

  return ({ routes: route_current })
}
