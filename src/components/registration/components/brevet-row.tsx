import React from 'react'
import { Brevet } from 'src/data/events'
import { getDateTimeShort } from 'src/utils'
import { Link, MapLink } from 'src/components/Link'

type BrevetColumnType = {
    brevet: Brevet,
    canRegister: boolean,
    registrationDeadline: Date
}

export const BrevetColumn = ({ brevet, canRegister, registrationDeadline }: BrevetColumnType) => (<>
    <strong><Link to={brevet.path}>{brevet.route}</Link></strong>
    <br />
    <small>Start: <MapLink location={brevet.startLocation}>{brevet.startLocation}</MapLink></small>
    <br />
    <small>
        {canRegister && 'Registration deadline: ' + getDateTimeShort(registrationDeadline)}
        {!canRegister && 'Registration closed'}
    </small>
</>)
