import React, { useState, FormEvent } from 'react'
import { Loading } from '../../form/input-field'
import { Fieldset } from '../../form/fieldset'
import { Brevet } from '../types'
import { useBrevets } from '../hooks/useBrevets'
import { BrevetDescription } from './brevet-description'

import styles from '../../styles/registration.module.scss'
import { Button } from '../../form/buttons'

const minBrevet = 5
const fieldSetID = 'upcoming_brevets'

const formatDate = (timestamp: number) => {
    const d = new Date(timestamp * 1000)
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return `${day[d.getDay()]} ${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

const BrevetRow = ({ brevet, isSelected, handleChange }: { brevet: Brevet, isSelected: boolean, handleChange: (brevet) => void }) => {
    const onChange = (evt) => {
        handleChange(brevet)
    }

    const id = `brevet${brevet.sched_id}`
    const classNames = `${styles.brevetRow} ${isSelected ? styles.brevetRowSelected : ''}`

    return (
        <tr className={classNames} onClick={onChange} >
            <td>
                <input
                    type="radio"
                    aria-labelledby={id}
                    name={fieldSetID}
                    value={brevet.sched_id}
                    onChange={onChange}
                    checked={isSelected}
                    className={styles.brevetRadio}
                />
            </td>
            <td>{formatDate(brevet.unixtime)}</td>
            <td>{brevet.stime}</td>
            <td>{brevet.chapter}</td>
            <td>{brevet.distance}{' '}{brevet.event}</td>
            <td>
                <label id={id} htmlFor={brevet.sched_id}><strong>{brevet.route}</strong>
                    <br />
                    <small>{brevet.startloc}</small>
                    <br />
                    {brevet.rwgps && <small>(<a href={brevet.rwgps} target="_blank">View {brevet.route} route</a>)</small>}
                </label>
            </td>
        </tr>
    )
}

type Props = {
    onChange: (Brevet) => void
}

export const SelectBrevets = ({ onChange }: Props) => {
    const { loading, brevets } = useBrevets()
    const [displayBrevets, setDisplay] = useState<number>(minBrevet)
    const [selectedBrevetId, setSelectedBrevetId] = useState<Brevet['sched_id']>('')

    const handleChange = (brevet: Brevet) => {
        onChange(brevet)
        setSelectedBrevetId(brevet.sched_id)
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
                        <BrevetRow key={i} brevet={brevet} handleChange={handleChange} isSelected={selectedBrevetId === brevet.sched_id} />
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
