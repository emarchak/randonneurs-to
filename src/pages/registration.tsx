import React from 'react'

import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import { ContentWrapper } from "../components/content-wrapper"
import { Callout } from "../components/callout"
import { RegistrationForm } from "../components/registration"

const Registration = () => (
    <Layout>
        <SEO title='Register for a ride' />
        <ContentWrapper><h1>Register to ride</h1>
            <Callout>
                <p>For all sanctioned rides, we require riders to sign the OCA consent waiver and read their Progressive Return to Cycling Policy.</p>

                <p>Please <a href="https://www.ontariocycling.org">visit the OCA Website for the latest information</a> regarding permissible club/team and group riding activities. </p>

                <p>If you have any questions, <a href="http://randonneursontario.ca/who/board.html">please contact your chapter VP</a>.</p>
            </Callout>

            <p>All rides must be submitted at least a week prior to the start date, and are not approved until the chapter VP has confirmed with the rider.</p>

        </ContentWrapper>
        <RegistrationForm />
    </Layout>
)

export default Registration
