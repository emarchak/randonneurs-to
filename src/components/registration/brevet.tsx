import React from 'react'
import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'
import { ContentWrapper } from "src/components/content-wrapper"
import { Callout } from "src/components/callout"
import { RegistrationForm } from "./registration-form"

export const BrevetRegistration = () => {
  return (
    <Layout>
      <SEO title='Register for a ride' />
      <ContentWrapper>
        <h1>Register to ride</h1><h2>with Randonneurs Ontario</h2>

        <p>For all sanctioned rides, we require riders to have OCA membership and read the <a href="https://www.ontariocycling.org/forms/oca-progressive-return-to-cycling-policy/">Progressive Return to Cycling Policy</a>.</p>

        <p>Please <a href="https://www.ontariocycling.org">visit the OCA Website for the latest information</a> regarding permissible club/team and group riding activities. </p>

        <p>If you have any questions, <a href="http://randonneursontario.ca/who/board.html">please contact your chapter VP</a>.</p>

        <Callout alternative>
          <p>Rides are not approved until the chapter VP has confirmed with the rider.</p>
        </Callout>

      </ContentWrapper>

      <RegistrationForm />
    </Layout>
  )
}