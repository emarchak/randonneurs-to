import React, { useState } from 'react'
import { Loading } from '../form/input-field'
import { Brevet } from './types'

type Props = { brevets?: Brevet[] }

const BrevetRow = ({ brevet }: { brevet: Brevet }) => (
    <tr>
        <td>{brevet.date}</td>
        <td>{brevet.chapter}</td>
        <td>{brevet.distance}</td>
        <td>{brevet.route} ({brevet.event})</td>
    </tr>
)

export const UpcomingBrevets = ({ brevets }: Props) => {
    const [displayBrevets, setDisplay] = useState<number>(3);
    if (!brevets) {
        return <Loading />
    }

    return (<div>
        <h2>Upcoming Brevets</h2>
        <table>
            <tbody>
                {brevets.slice(0, displayBrevets).map((brevet, i) => (
                    <BrevetRow key={i} brevet={brevet} />
                ))}
            </tbody>
            <tfoot>
                <tr><td colSpan={4}>
                    <button
                        disabled={(displayBrevets > brevets.length)}
                        onClick={(evt) => {
                            evt.preventDefault()
                            setDisplay(displayBrevets + 3)
                        }}>
                        Show more
                    </button>
                </td></tr>
            </tfoot>

        </table>
    </div >)
}