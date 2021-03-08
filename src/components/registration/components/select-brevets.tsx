import React, { useState, FormEvent } from 'react'
import { Loading } from '../../form/input-field'
import { Fieldset } from '../../form/fieldset'
import { Brevet } from '../types'
import { useBrevets } from '../hooks/useBrevets'
import { BrevetDescription } from './brevet-description'
import { getDateLong, getTime } from '../../../helpers'
import styles from '../../styles/registration.module.scss'
import { Button } from '../../form/buttons'

const minBrevet = 5
const fieldSetID = 'upcoming_brevets'

const BrevetRow = ({ brevet, isSelected, handleChange }: { brevet: Brevet, isSelected: boolean, handleChange: (brevet) => void }) => {
    const onChange = () => {
        handleChange(brevet)
    }

    const classNames = `${styles.brevetRow} ${isSelected ? styles.brevetRowSelected : ''}`
    const date = new Date(brevet.date)

    return (
        <tr className={classNames} onClick={onChange} >
            <td>
                <input
                    type="radio"
                    aria-labelledby={brevet.id}
                    name={fieldSetID}
                    value={brevet.id}
                    onChange={onChange}
                    checked={isSelected}
                    className={styles.brevetRadio}
                />
            </td>
            <td>{getDateLong(date)}</td>
            <td>{getTime(date)}</td>
            <td>{brevet.chapter}</td>
            <td>{brevet.distance}{' '}{brevet.event}</td>
            <td>
                <label id={brevet.id} htmlFor={brevet.id}><strong>{brevet.route}</strong>
                    <br />
                    <small>{brevet.startLocation}</small>
                    {brevet.rwgpsUrl && <>
                        <br />
                        <small>(<a href={brevet.rwgpsUrl} target="_blank">View {brevet.route} route</a>)</small>
                    </>}
                </label>
            </td>
        </tr>
    )
}

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
                        <BrevetRow key={i} brevet={brevet} handleChange={handleChange} isSelected={selectedBrevetId === brevet.id} />
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
