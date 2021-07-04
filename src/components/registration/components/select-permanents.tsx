import React, { ChangeEvent, useMemo, useState } from 'react'
import { InlineInputs } from 'src/components/form/fieldset'
import { RadioTable, SelectField } from 'src/components/form/components'
import { Link } from 'src/components/link'
import { useRoutes, Route } from '../hooks/useRoutes'
import { getDistanceKey, getIsDistance, sortDistances } from './utils'

type Props = {
  onChange: (Route) => void
}

const mapURL = (location: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`

const routeColumns = {
  chapter: 'Chapter',
  distance: 'Distance',
  route: 'Route'
}

const RouteDescription = ({ route }: { route: Route }) => (
  <>
    <strong>{route.name}</strong>
    {route.startLocation && <>
      <br />
      <small>Suggested start: <Link href={mapURL(route.startLocation)}>{route.startLocation}</Link></small>
    </>}
  </>
)

export const SelectPermanents = ({ onChange }: Props) => {
  const { routes: fullRoutes } = useRoutes()

  const [selectedRouteId, setSelectedRouteId] = useState<Route['id']>('')
  const [filters, setFilters] = useState({
    chapter: '',
    distance: ''
  })

  const options = useMemo(() => {
    const chapters = new Set<string>()
    const distances = new Set<string>()
    const availableRoutes = []

    fullRoutes.forEach((route) => {
      const isChapter = filters.chapter ? route.chapter === filters.chapter : true
      const isDistance = filters.distance ? getIsDistance(route.distance, filters.distance) : true

      chapters.add(route.chapter)
      distances.add(getDistanceKey(route.distance))

      if (isChapter && isDistance) {
        availableRoutes.push({
          value: route.id,
          columns: {
            chapter: route.chapter,
            distance: route.distance,
            route: <RouteDescription route={route} />,
          },
        })
      }
    })

    return {
      chapters: Array.from(chapters).sort(),
      distances: Array.from(distances).sort(sortDistances),
      routes: availableRoutes
    }
  }, [filters.chapter, filters.distance])

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
      <h2>Available routes</h2>
      <InlineInputs>
        <SelectField label={'Filter by chapter'} name="chapter" options={options.chapters} value={filters.chapter} onChange={handleFilterChange} />
        <SelectField label={'Filter by distance'} name="distance" options={options.distances} value={filters.distance} onChange={handleFilterChange} />
      </InlineInputs>
      <RadioTable
        label={'Available routes'}
        hideLabel
        help={<>See the full routes in our <Link href="https://www.randonneursontario.ca/">route archive</Link>.</>}
        name="route"
        columns={routeColumns}
        labelColumn='route'
        options={options.routes}
        value={selectedRouteId}
        empty={'No routes available'}
        onChange={handleRouteChange} />
    </>)
}
