import React, { ChangeEvent, useMemo, useState } from 'react'
import { InlineInputs } from 'src/components/form/fieldset'
import { RadioField, RadioTable, SelectField } from 'src/components/form/input-field'
import { useRoutes, Route } from '../hooks/useRoutes'

type Props = {
  onChange: (Route) => void
}

const sortDistance = (a, b) => (a - b)

const filterOptions = (route: Route, chapter: string, distance: string) => {
  const isChapter = chapter ? route.chapter === chapter : true
  const isDistance = distance ? route.distance === parseInt(distance) : true

  return (isDistance && isChapter)
}

export const SelectPermanents = ({ onChange }: Props) => {
  const { routes: fullRoutes } = useRoutes()

  const [selectedRouteId, setSelectedRouteId] = useState<Route['id']>('')
  const [filters, setFilters] = useState({
    chapter: '',
    distance: ''
  })

  const filterRoutes = (route) => filterOptions(route, filters.chapter, filters.distance)

  const filterDistances = (distance) => Boolean(fullRoutes
    .filter((route) => filterOptions(route, filters.chapter, distance)).length)

  const filterChapters = (chapter) => Boolean(fullRoutes
    .filter((route) => filterOptions(route, chapter, filters.distance)).length)

  const routeColumns = ['Chapter', 'Distance', 'Route name', 'Start location']

  const options = useMemo(() => ({
    chapters: Array.from(new Set(fullRoutes.map(route => (route.chapter)))).filter(filterChapters),
    distances: Array.from(new Set(fullRoutes.map(route => (route.distance)))).filter(filterDistances).sort(sortDistance),
    routes: fullRoutes.filter(filterRoutes).map(route => ({
      value: route.id,
      labelColumn: route.routeName,
      columns: {
        chapter: route.chapter,
        distance: route.distance,
        routeName: route.routeName,
        startLocation: route.startLocation
      },
    }))
  }), [filters.chapter, filters.distance])

  const handleFilterChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = evt.currentTarget
    setFilters({
      ...filters,
      [name]: value
    })
  }

  const handleRouteChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value: routeId } = evt.currentTarget
    const route = fullRoutes.find((route) => route.id === routeId)
    setSelectedRouteId(route?.id)
    onChange(route)
  }

  return (
    <>
      <InlineInputs>
        <SelectField label={'Filter by chapter'} name="chapter" options={options.chapters} value={filters.chapter} onChange={handleFilterChange} />
        <SelectField label={'Filter by distance'} name="distance" options={options.distances} value={filters.distance} onChange={handleFilterChange} />
      </InlineInputs>
      <RadioTable label={'Available routes'} name="route" columns={routeColumns} labelColumn='routeName' options={options.routes} value={selectedRouteId} onChange={handleRouteChange} />
    </>)
}