import React from 'react'
import { Link } from 'src/components/form/link'

export const MissingMembership = () => (
    <>
        <strong>We can't find your name in our list of members. It must match what you used to register with the OCA.</strong><br />
        You must be an <Link href="http://randonneursontario.ca/who/how.html">active member of Randonneurs Ontario and the OCA</Link> to ride with us. You can still submit this form, but you can't ride until we can confirm you're a member
    </>)
