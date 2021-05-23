import React from 'react'
import { Brevet } from 'src/hooks/useBrevets'
import { getDateTimeShort } from 'src/utils'

import { Link } from 'src/components/link'

type BrevetColumnType = {
    brevet: Brevet,
    canRegister: boolean,
    registrationDeadline: Date
}

export const BrevetColumn = ({ brevet, canRegister, registrationDeadline }: BrevetColumnType) => (<>
    <strong>{brevet.route}</strong>
    <br />
    <small>{brevet.startLocation}</small>
    {brevet.rwgpsUrl && <>
        <br />
        <small>(<Link href={brevet.rwgpsUrl}>{`View ${brevet.route} route`}</Link>)</small>
    </>}
    <small><br />
        {canRegister && 'Registration deadline: ' + getDateTimeShort(registrationDeadline)}
        {!canRegister && 'Registration closed'}
    </small>
</>)
