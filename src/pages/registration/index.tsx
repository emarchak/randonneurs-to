import React from 'react'
import { Callout } from 'src/components/callout'
import { ContentWrapper } from 'src/components/content-wrapper'
import { Link } from 'src/components/link'
import { Layout } from 'src/components/layout'
import { RegistrationFormBrevet } from 'src/components/registration'
import { SEO } from 'src/components/seo'
import { TabMenu } from 'src/components/tabmenu'

export const registrationRoutes = [
  { label: 'Membership', route: '/registration/membership/' },
  { label: 'Rides', route: '/registration/' },
  { label: 'Permanents', route: '/registration/permanent/' },
  { label: 'Trace', route: '/registration/trace-virtuelle/' },
]

const BrevetRegistration = () => {
  return (
    <Layout hideHeader>
      <SEO title='Register for a ride' description="Register for a brevet with Randonneurs Ontario, an memmber of the Audax Club Parisien" />
      <ContentWrapper>
        <TabMenu tabs={registrationRoutes} activeRoute='/registration/' />
        <h1>Register to ride</h1><h2>with Randonneurs Ontario</h2>

        <p>You must have an OCA membership and have read the <Link href='https://ontariocycling.org/covid-19-information/'>latest OCA Return to Sport updates</Link>. Please visit the <Link href='https://www.ontariocycling.org'>OCA Website for the latest information</Link> about group riding during the pandemic.</p>

        <Callout alternative>
          <p>Your ride is not approved until your Chapter VP has confirmed with you.</p>
          <p><Link href='http://randonneursontario.ca/who/board.html'>Contact your Chapter VP</Link> if you have any questions.</p>
        </Callout>

      </ContentWrapper>

      <RegistrationFormBrevet />
    </Layout>
  )
}

export default BrevetRegistration
