
import { graphql, useStaticQuery } from 'gatsby'
import { useMemo } from 'react'
import { Route } from '../../../hooks/useBrevets'


export const useRoutes = () => {
  const { allGoogleRoutesSheet: { edges } } = useStaticQuery(graphql`
    query {
      allGoogleRoutesSheet(filter: {ableToRide_: {eq: "Yes"}}, sort: {fields: chapter}) {
          edges {
            node {
              id
              chapter
              distance
              routeName
              startLocation
            }
          }
      }
    }
    `)

  const routes = useMemo(() => edges.map(edge => edge.node), [edges]) as Route[]

  return ({ routes })
}