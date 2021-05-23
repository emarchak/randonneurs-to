import React, { useState, FormEvent, ChangeEvent } from 'react'
import { RadioTable } from 'src/components/form/components'
import { Fieldset } from 'src/components/form/fieldset'
import { useBrevets, Brevet } from 'src/hooks/useBrevets'
import { BrevetColumn } from './brevet-row'
import { getDateLong, getTime } from 'src/utils'
import { useAllowedStartTimes } from '../hooks/useAllowedStartTimes'

const fieldSetID = 'upcoming_brevets'

type Props = {
    onChange: (Brevet) => void
}

export const SelectBrevets = ({ onChange }: Props) => {
    const { brevets } = useBrevets({})
    const { allowedToRegister, getBrevetRegistrationDeadline } = useAllowedStartTimes()
    const [selectedBrevetId, setSelectedBrevetId] = useState<Brevet['id']>('')

    const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const { value } = evt.currentTarget
        const brevet = brevets.find(brevet => brevet.id === value)

        setSelectedBrevetId(value)
        onChange(brevet)
    }

    const columns = {
        date: 'Date',
        time: 'Start time',
        chapter: 'Chapter',
        distance: 'Distance',
        event: 'Event'
    }

    const options = brevets.map((brevet) => ({
        value: brevet.id,
        disabled: !allowedToRegister(brevet),
        columns: {
            date: getDateLong(brevet.date),
            time: getTime(brevet.date),
            chapter: brevet.chapter,
            distance: brevet.distance,
            event: <BrevetColumn brevet={brevet} canRegister={allowedToRegister(brevet)} registrationDeadline={getBrevetRegistrationDeadline(brevet)} />
        }
    }))

    return (
        <Fieldset id={fieldSetID}><>
            <h2>Upcoming Brevets</h2>
            <RadioTable
                name={fieldSetID}
                label='Upcoming Brevets'
                labelColumn='event'
                columns={columns}
                options={options}
                value={selectedBrevetId}
                empty='No rides available'
                onChange={handleOnChange}
            />
        </></Fieldset>
    )
}
