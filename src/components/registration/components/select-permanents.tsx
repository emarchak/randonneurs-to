import React, { ChangeEvent, useState } from 'react'
import { SelectField } from '../../form/input-field'
import { PermanentDescription } from './permanent-description'
import { graphql, useStaticQuery } from 'gatsby'
import { Route } from '../types'
import { useRoutes } from '../hooks/useRoutes'

const routeQuery = graphql`
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
`

type Props = {
    onChange: (Route) => void
}

export const SelectPermanents = ({ onChange }: Props) => {
    const [selectedRouteId, setSelectedRouteId] = useState<Route['id']>('')
    const { routes } = useRoutes()

    const options = routes.map(route => ({ value: route.id, label: `${route.chapter} - ${route.routeName}` }))

    const handleChange = (evt: ChangeEvent<HTMLSelectElement>) => {
        const { value: routeId } = evt.currentTarget
        const route = routes.find((route) => route.id === routeId)
        setSelectedRouteId(route?.id)
        onChange(route)
    }

    return (
        <>
            <PermanentDescription />
            <SelectField label={'Routes'} name="route" options={options} value={selectedRouteId} onChange={handleChange} />
        </>)
}