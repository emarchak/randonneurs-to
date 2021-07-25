
import { graphql, useStaticQuery } from 'gatsby'
import { Chapter } from 'src/data/brevets'

export type Route = {
  chapter: Chapter
  distance: number
  startLocation: string
  name: string
  id: number
}

export const useRoutes = () => {
  const { db: { routes } } = useStaticQuery(graphql`
    query {
      db {
        routes(
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

  return ({ routes })
}
