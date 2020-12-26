import React from 'react'

import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import { ContentWrapper } from "../components/content-wrapper"
import { Callout } from "../components/callout"
import { RegistrationForm } from "../components/registration"

const Registration = () => (
    <Layout>
        <SEO title='Register for a ride' />
        <ContentWrapper><h1>Register to ride</h1></ContentWrapper>

        <Callout><ContentWrapper>
            <p>For all sanctioned rides, we require riders to sign the OCA consent waiver and read their Progressive Return to Cycling Policy.</p>
        </ContentWrapper></Callout>
        <ContentWrapper>
            <p>All rides must be submitted at least a week prior to the start date, and are not approved until the chapter VP has confirmed with the rider.</p>

            <p>Please visit the OCA Website for the latest information regarding permissible club/team and group riding activities. https://www.ontariocycling.org</p>

            <p>If you have any questions, please contact your chapter VP at http://randonneursontario.ca/who/board.html</p>
        </ContentWrapper>
        <RegistrationForm />
    </Layout>
)

export default Registration
