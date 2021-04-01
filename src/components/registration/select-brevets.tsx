import React, { useState, FormEvent } from 'react'
import { Loading } from 'src/components/form/input-field'
import { Fieldset } from 'src/components/form/fieldset'
import { useBrevets, Brevet } from 'src/hooks/useBrevets'
import { BrevetDescription } from './brevet-description'
import { BrevetRow } from './brevet-row'
import styles from 'src/components/styles/registration.module.scss'
import { Button } from 'src/components/form/buttons'

const minBrevet = 5
const fieldSetID = 'upcoming_brevets'

type Props = {
    onChange: (Brevet) => void
}

export const SelectBrevets = ({ onChange }: Props) => {
    const { loading, brevets } = useBrevets({})
    const [displayBrevets, setDisplay] = useState<number>(minBrevet)
    const [selectedBrevetId, setSelectedBrevetId] = useState<Brevet['id']>('')

    const handleChange = (brevet: Brevet) => {
        onChange(brevet)
        setSelectedBrevetId(brevet.id)
    }

    const handleShowMore = (evt) => {
        evt.preventDefault()
        setDisplay(displayBrevets + minBrevet)
    }

    if (loading) {
        return <Loading />
    }
    if (!Boolean(brevets.length)) {
        return <h2>No upcoming brevets</h2>
    }
    return (<>
        <BrevetDescription />
        <Fieldset id={fieldSetID}><>
            <h2>Upcoming Brevets</h2>

            <table className={styles.brevetTable}>
                <thead><tr>
                    <th></th>
                    <th>Date</th>
                    <th>Start time</th>
                    <th>Chapter</th>
                    <th colSpan={2}>Event</th>
                </tr></thead>
                <tbody>
                    {brevets.slice(0, displayBrevets).map((brevet, i) => (
                        <BrevetRow key={i} brevet={brevet} handleChange={handleChange} isSelected={selectedBrevetId === brevet.id} fieldsetID={fieldSetID} />
                    ))}
                </tbody>
                <tfoot>
                    <tr><td colSpan={6} className={styles.brevetsShowMoreWrapper}>
                        <Button
                            disabled={(displayBrevets > brevets.length)}
                            handleClick={handleShowMore}
                            className={styles.brevetsShowMore}
                        >
                            Show more
                    </Button>
                    </td></tr>
                </tfoot>

            </table>
        </></Fieldset>
    </>
    )
}
