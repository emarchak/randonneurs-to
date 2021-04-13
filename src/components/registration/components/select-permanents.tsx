import React, { ChangeEvent, useState } from 'react'
import { SelectField } from 'src/components/form/input-field'
import { useRoutes, Route } from '../hooks/useRoutes'

type Props = {
  onChange: (Route) => void
}

const sortRoutes = (a: Route, b: Route) => a.chapter.localeCompare(b.chapter) || a.distance - b.distance

export const SelectPermanents = ({ onChange }: Props) => {
  const [selectedRouteId, setSelectedRouteId] = useState<Route['id']>('')
  const { routes } = useRoutes()

  const options = routes.sort(sortRoutes).map(route => ({ value: route.id, label: `${route.chapter} - ${route.distance} - ${route.routeName}` }))

  const handleChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    const { value: routeId } = evt.currentTarget
    const route = routes.find((route) => route.id === routeId)
    setSelectedRouteId(route?.id)
    onChange(route)
  }

  return (
    <>
      <SelectField label={'Routes'} name="route" options={options} value={selectedRouteId} onChange={handleChange} />
    </>)
}