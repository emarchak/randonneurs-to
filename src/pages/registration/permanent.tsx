import React from 'react'
import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'
import { ContentWrapper } from "src/components/content-wrapper"
import { RegistrationFormPermanent } from 'src/components/registration'
import { Aside } from 'src/components/callout'

export const PermanentRegistration = () => {
  return (
    <Layout>
      <SEO title='Register for a permanent' />
      <ContentWrapper>
        <h1>Register to a permanent</h1><h2>with Randonneurs Ontario</h2>

        <p>For all sanctioned rides, we require riders to have OCA membership and read the <a href="https://www.ontariocycling.org/forms/oca-progressive-return-to-cycling-policy/">Progressive Return to Cycling Policy</a>.</p>

        <p>Please <a href="https://www.ontariocycling.org">visit the OCA Website for the latest information</a> regarding permissible club/team and group riding activities. </p>

        <p>If you have any questions, <a href="http://randonneursontario.ca/who/board.html">please contact your chapter VP</a>.</p>

        <Aside>
          <p><strong>A Permanent ride</strong> is one of the existing Randonneurs Ontario brevet routes ridden outside of the normal Brevet schedule. Any current Randonneurs Ontario member may propose riding a Permanent, with at least two weeks in advance of the proposed date. Once approved, there can be no changes to the request, except at the discretion of the Chapter VP and Treasurer.</p>
          <p>Standard brevet rules apply for Permanents. Control cards must be completed during the ride, including start and end. Permanents do not take the place of brevets for the ACP Super Randonneur award, nor will they count for qualification for PBP.</p>
          <p><a href="http://randonneursontario.ca/Permanents/Permanents.html">Learn more about our permanents program.</a></p>
        </Aside>

      </ContentWrapper>

      <RegistrationFormPermanent />
    </Layout>
  )
}

export default PermanentRegistration
