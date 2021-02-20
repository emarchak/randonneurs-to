import React, { useState } from 'react'
import { Loading } from '../form/input-field'
import { Brevet } from './types'
import { useBrevets } from './hooks/useBrevets'

const minBrevet = 5

const formatDate = (timestamp: number) => {
    const d = new Date(timestamp * 1000)
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return `${day[d.getDay()]} ${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

const BrevetRow = ({ brevet }: { brevet: Brevet }) => (
    <tr>
        <td>{formatDate(brevet.unixtime)}</td>
        <td>{brevet.stime}</td>
        <td>{brevet.chapter}</td>
        <td>{brevet.distance}{' '}{brevet.event}</td>
        <td>
            <strong>
                <a href={brevet.rwgps} target="_blank">{brevet.route} ↗</a>
            </strong>
            <br />
            {brevet.startloc}
        </td>
    </tr>
)

export const UpcomingBrevets = () => {
    const { loading, brevets } = useBrevets()

    const [displayBrevets, setDisplay] = useState<number>(minBrevet)
    if (loading) {
        return <Loading />
    }
    if (!brevets.length) {
        return <h2>No upcoming brevets</h2>
    }

    return (<>
        <h2>Upcoming Brevets</h2>
        <table>
            <thead><tr>
                <th>Date</th>
                <th>Start time</th>
                <th>Chapter</th>
                <th>Event</th>
                <th></th>
            </tr></thead>
            <tbody>
                {brevets.slice(0, displayBrevets).map((brevet, i) => (
                    <BrevetRow key={i} brevet={brevet} />
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
    </ >)
}