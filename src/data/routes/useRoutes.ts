
import { graphql, useStaticQuery } from 'gatsby'
import { Chapter } from 'src/data/events'

export type Route = {
  chapter: Chapter
  distance: number
  startLocation: string
  name: string
  id: number
}

export const useRoutes = () => {
  const { db: { routes } } = useStaticQuery(graphql`
    query useRoutesQuery {
      db {
        routes(
          order_by: {chapter: asc, distance: asc}
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
