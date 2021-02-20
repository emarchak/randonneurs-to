import React, { useState, FormEvent } from 'react'
import { Loading } from '../form/input-field'
import { Fieldset } from '../form/fieldset'
import { Brevet } from './types'
import { useBrevets } from './hooks/useBrevets'
import { BrevetDescription } from './brevet-description'

const minBrevet = 5
const fieldSetID = 'upcoming_brevets'

const formatDate = (timestamp: number) => {
    const d = new Date(timestamp * 1000)
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return `${day[d.getDay()]} ${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

const BrevetRow = ({ brevet, handleChange }: { brevet: Brevet, handleChange: (brevet) => void }) => {
    const onChange = () => {
        handleChange(brevet)
    }

    const id = `brevet${brevet.sched_id}`
    return (
        <tr>
            <td>
                <input type="radio" aria-labelledby={id} name={fieldSetID} value={brevet.sched_id} onChange={onChange} />
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
                    <small>(<a href={brevet.rwgps} target="_blank">View {brevet.route} ↗</a>)</small>
                </label>
            </td>
        </tr>
    )
}

type Props = {
    onBrevetChange: (Brevet) => void
}

export const UpcomingBrevets = ({ onBrevetChange }: Props) => {
    const { loading, brevets } = useBrevets()
    const [displayBrevets, setDisplay] = useState<number>(minBrevet)

    const onChange = (brevet: Brevet) => {
        onBrevetChange(brevet)
    }

    if (loading) {
        return <Loading />
    }
    if (!brevets.length) {
        return <h2>No upcoming brevets</h2>
    }
    return (<>
        <BrevetDescription />
        <Fieldset id={fieldSetID}><>
            <h2>Upcoming Brevets</h2>

            <table>
                <thead><tr>
                    <th></th>
                    <th>Date</th>
                    <th>Start time</th>
                    <th>Chapter</th>
                    <th colSpan={2}>Event</th>
                </tr></thead>
                <tbody>
                    {brevets.slice(0, displayBrevets).map((brevet, i) => (
                        <BrevetRow key={i} brevet={brevet} handleChange={onChange} />
                    ))}
                </tbody>
                <tfoot>
                    <tr><td colSpan={6}>
                        <button
                            disabled={(displayBrevets > brevets.length)}
                            onClick={(evt) => {
                                evt.preventDefault()
                                setDisplay(displayBrevets + minBrevet)
                            }}>
                            Show more
                    </button>
                    </td></tr>
                </tfoot>

            </table>
        </></Fieldset>
    </>
    )
}