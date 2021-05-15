import React from 'react'
import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'
import { ContentWrapper } from "src/components/content-wrapper"
import { RegistrationFormPermanent } from 'src/components/registration'
import { Callout } from 'src/components/callout'
import { registrationRoutes } from '.'
import { TabMenu } from 'src/components/tabmenu'
import { Link } from 'src/components/form/link'

export const PermanentRegistration = () => {
  return (
    <Layout hideHeader>
      <SEO title='Register for a permanent' />
      <ContentWrapper>
        <TabMenu tabs={registrationRoutes} activeRoute='/registration/permanent/' />
        <h1>Register for a permanent</h1><h2>with Randonneurs Ontario</h2>

        <p>You must have an OCA membership and have read the <Link href='https://www.ontariocycling.org/forms/oca-progressive-return-to-cycling-policy/'>Progressive Return to Cycling Policy</Link>. Please visit the <Link href='https://www.ontariocycling.org'>OCA Website for the latest information</Link> about group riding during the pandemic.</p>

        <Callout alternative>
          <p><strong>A Permanent ride</strong> is one of the existing Randonneurs Ontario brevet routes ridden outside of the normal Brevet schedule. Any current Randonneurs Ontario member may propose riding a Permanent, with at least two weeks in advance of the proposed date. Once approved, there can be no changes to the request, except at the discretion of the Chapter VP and Treasurer.</p>
          <p>Standard brevet rules apply for Permanents. Control cards must be completed during the ride, including start and end. Permanents do not take the place of brevets for the ACP Super Randonneur award, nor will they count for qualification for PBP.</p>
          <p><Link href="http://randonneursontario.ca/Permanents/Permanents.html">Learn more about our permanents program.</Link></p>
        </Callout>

      </ContentWrapper>

      <RegistrationFormPermanent />
    </Layout>
  )
}

export default PermanentRegistration
