import React, { useState, FormEvent, ChangeEvent, useMemo, useEffect } from 'react'
import { RadioTable, SelectField } from 'src/components/form/components'
import { Fieldset, InlineInputs } from 'src/components/form/fieldset'
import { useEvents, Brevet } from 'src/data/events'
import { BrevetColumn } from './brevet-row'
import { getDateLong, getTime } from 'src/utils'
import { useAllowedStartTimes } from '../hooks/useAllowedStartTimes'
import { getDistanceKey, getIsDistance, sortDistances } from './utils'

const fieldSetID = 'upcoming_brevets'

const columns = {
    date: 'Date',
    time: 'Start time',
    chapter: 'Chapter',
    distance: 'Distance',
    event: 'Event'
}

type Props = {
    initEventId: string,
    onChange: (Brevet) => void
}

export const SelectBrevets = ({initEventId, onChange }: Props) => {
    const { events } = useEvents({limit: false})
    const { allowedToRegister, getBrevetRegistrationDeadline } = useAllowedStartTimes()
    const [selectedEventId, setSelectedEventId] = useState<Brevet['id']>('')
    const [filters, setFilters] = useState({
        chapter: '',
        distance: ''
    })

    useEffect(() => {
        if (initEventId) {
            findEvent(initEventId)
        }
    }, [])

    const findEvent = (id: string) => {
        const event = events.find(brevet => brevet.id === id)
        setSelectedEventId(id)
        onChange(event)
    }

    const handleFilterChange = (evt: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = evt.currentTarget
        setFilters({
            ...filters,
            [name]: value
        })
    }
    const handleBrevetChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const { value } = evt.currentTarget
        findEvent(value)
    }

    const options = useMemo(() => {
        const chapters = new Set<string>()
        const distances = new Set<string>()
        const availableEvents = []

        events.forEach((brevet) => {
            const isChapter = filters.chapter ? brevet.chapter === filters.chapter : true
            const isDistance = filters.distance ? getIsDistance(brevet.distance, filters.distance) : true

            chapters.add(brevet.chapter)
            distances.add(getDistanceKey(brevet.distance))

            if (isChapter && isDistance) {
                availableEvents.push({
                    value: brevet.id,
                    disabled: !allowedToRegister(brevet),
                    columns: {
                        date: getDateLong(brevet.date),
                        time: getTime(brevet.date),
                        chapter: brevet.chapter,
                        distance: brevet.distance,
                        event: <BrevetColumn brevet={brevet} canRegister={allowedToRegister(brevet)} registrationDeadline={getBrevetRegistrationDeadline(brevet)} />
                    }
                })
            }
        })

        return {
            chapters: Array.from(chapters).sort(),
            distances: Array.from(distances).sort(sortDistances),
            events: availableEvents
        }
    }, [filters.chapter, filters.distance])

    return (
        <Fieldset id={fieldSetID}>
            <h2>Upcoming Rides</h2>
            <InlineInputs>
                <SelectField label={'Filter by chapter'} name="chapter" options={options.chapters} value={filters.chapter} onChange={handleFilterChange} />
                <SelectField label={'Filter by distance'} name="distance" options={options.distances} value={filters.distance} onChange={handleFilterChange} />
            </InlineInputs>
            <RadioTable
                name={fieldSetID}
                label='Selected Rides'
                hideLabel
                labelColumn='event'
                columns={columns}
                options={options.events}
                value={selectedEventId}
                empty='No rides available'
                onChange={handleBrevetChange}
            />
        </Fieldset>
    )
}
