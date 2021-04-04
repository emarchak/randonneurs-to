import React from 'react'
import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'
import { ContentWrapper } from 'src/components/content-wrapper'
import { Callout } from 'src/components/callout'
import { RegistrationFormBrevet } from 'src/components/registration'
import { TabMenu } from 'src/components/tabmenu'

export const registrationRoutes = [
  { label: 'Rides', route: '/registration/' },
  { label: 'Permanents', route: '/registration/permanent/' },
]

const BrevetRegistration = () => {
  return (
    <Layout hideHeader>
      <SEO title='Register for a ride' />
      <ContentWrapper>
        <TabMenu tabs={registrationRoutes} activeRoute='/registration/' />
        <h1>Register to ride</h1><h2>with Randonneurs Ontario</h2>

        <p>You must have an OCA membership and have read the <a href='https://www.ontariocycling.org/forms/oca-progressive-return-to-cycling-policy/'>Progressive Return to Cycling Policy</a>. Please visit the <a href='https://www.ontariocycling.org'>OCA Website for the latest information</a> about group riding during the pandemic.</p>

        <Callout alternative>
          <p>Your ride is not approved until your Chapter VP has confirmed with you.</p>
          <p><a href='http://randonneursontario.ca/who/board.html'>Contact your Chapter VP</a> if you have any questions.</p>
        </Callout>

      </ContentWrapper>

      <RegistrationFormBrevet />
    </Layout>
  )
}

export default BrevetRegistration