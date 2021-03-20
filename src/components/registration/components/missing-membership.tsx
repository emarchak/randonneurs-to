import React from 'react'

export const MissingMembership = ({ fullName }: { fullName: string }) => (
    <>
        {fullName} was not found in our list of members<br />
        <small>You must be an <a href="http://randonneursontario.ca/who/how.html">active member of Randonneurs Ontario to register</a></small>
    </>
)