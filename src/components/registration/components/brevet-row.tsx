import React from 'react'
import { Brevet } from 'src/data/useBrevets'
import { getDateTimeShort } from 'src/utils'
import { Link } from 'src/components/link'

const mapURL = (location: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`

type BrevetColumnType = {
    brevet: Brevet,
    canRegister: boolean,
    registrationDeadline: Date
}

export const BrevetColumn = ({ brevet, canRegister, registrationDeadline }: BrevetColumnType) => (<>
    <strong>{brevet.route}</strong>
    <br />
    <small>Start: <Link href={mapURL(brevet.startLocation)}>{brevet.startLocation}</Link></small>
    {brevet.rwgpsUrl && <>
        <br />
        <small>(<Link href={brevet.rwgpsUrl}>{`View ${brevet.route} route`}</Link>)</small>
    </>}
    <small><br />
        {canRegister && 'Registration deadline: ' + getDateTimeShort(registrationDeadline)}
        {!canRegister && 'Registration closed'}
    </small>
</>)
