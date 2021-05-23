
import { graphql, useStaticQuery } from 'gatsby'
import { useMemo } from 'react'
import { Chapter } from '../../../hooks/useBrevets'

export type Route = {
  chapter: Chapter
  distance: number
  startLocation: string
  routeName: string
  id: string
}

const sortRoutes = (a, b) => (a.chapter.localeCompare(b.chapter) || a.distance - b.distance)

export const useRoutes = () => {
  const { allGoogleRoutesSheet: { nodes } } = useStaticQuery(graphql`
    query {
      allGoogleRoutesSheet(filter: {ableToRide_: {eq: "Yes"}}, sort: {fields: [chapter, distance]}) {
        nodes {
          id
          chapter
          distance
          routeName
          startLocation
        }
      }
    }
    `)

  // Google sheets doesn't recognize distance as Int
  const routes = useMemo(() => nodes.map(node => ({ ...node, distance: parseInt(node.distance) })).sort(sortRoutes) as Route[], [])

  return ({ routes })
}
