import React from 'react'
import { LinkButton } from '../Buttons'
import { Callout } from "../callout"
import { ContentWrapper } from "../content-wrapper"
import { Link } from '../link'

export const SeasonsCta = () => (
  <Callout alternative>
    <ContentWrapper>
      <h3>About us</h3>
      <p>The Toronto Randonneurs are a chapter of Randonneurs Ontario ultra-distance cycling club. We've been riding long distance rides from of Toronto and southern Ontario since 1982.</p>
      <p><Link href='https://randonneursontario.ca/'>Randonneurs Ontario</Link> is affiliated with the <Link href='https://www.audax-club-parisien.com/en'>Audax Club Parisien</Link>, the parent organization governing the qualification of riders wishing to participate in the 1200K Paris - Brest - Paris Randonnee. The club is also affiliated with <Link href='https://www.audax-club-parisien.com/en/our-organizations/brm-world/'>Les Randonneurs Mondiaux</Link>, which provides recognition for brevets other than Paris - Brest - Paris that are longer than 1000K.</p>
      <p><LinkButton to='/registration/' secondary block>Register to ride with us</LinkButton></p>
    </ContentWrapper>
  </Callout>)
