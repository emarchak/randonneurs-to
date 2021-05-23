import React, { ChangeEvent, useMemo, useState } from 'react'
import { InlineInputs } from 'src/components/form/fieldset'
import { RadioTable, SelectField } from 'src/components/form/input-field'
import { Link } from 'src/components/form/link'
import { useRoutes, Route } from '../hooks/useRoutes'

type Props = {
  onChange: (Route) => void
}

const getDistanceKey = (distance) => {
  if (parseInt(distance) < 100) {
    return '< 100'
  }
  if (parseInt(distance) < 200) {
    return '100 - 199'
  }
  return distance.toString()
}

const getIsDistance = (route: Route, filterDistance: string) => getDistanceKey(route.distance) === filterDistance

const mapURL = (location: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`

const routeColumns = ['Chapter', 'Distance', 'Route']

const RouteDescription = ({ route }: { route: Route }) => (
  <>
    <strong>{route.routeName}</strong>
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
    const options = {
      chapters: new Set<string>(),
      distances: new Set<string>(),
      routes: []
    }

    fullRoutes.forEach((route) => {
      const isChapter = filters.chapter ? route.chapter === filters.chapter : true
      const isDistance = filters.distance ? getIsDistance(route, filters.distance) : true

      options.chapters.add(route.chapter)
      options.distances.add(getDistanceKey(route.distance))

      if (isChapter && isDistance) {
        options.routes.push({
          value: route.id,
          columns: {
            chapter: route.chapter,
            distance: route.distance,
            route: <RouteDescription route={route} />,
          },
        })
      }
    })

    return options
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
      <InlineInputs>
        <SelectField label={'Filter by chapter'} name="chapter" options={Array.from(options.chapters)} value={filters.chapter} onChange={handleFilterChange} />
        <SelectField label={'Filter by distance'} name="distance" options={Array.from(options.distances)} value={filters.distance} onChange={handleFilterChange} />
      </InlineInputs>
      <RadioTable
        label={'Available routes'}
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