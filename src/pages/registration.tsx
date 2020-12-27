import React from 'react'
import { graphql, useStaticQuery } from "gatsby"
import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import { ContentWrapper } from "../components/content-wrapper"
import { Callout } from "../components/callout"
import { RegistrationForm, Route } from "../components/registration"

const Registration = () => {
  const { allGoogleRoutesSheet: { edges } } = useStaticQuery(
    graphql`
          query {
            allGoogleRoutesSheet(filter: {ableToRide_: {eq: "Yes"}}, sort: {fields: chapter}) {
                edges {
                  node {
                    id
                    chapter
                    distance
                    routeName
                    startLocation
                  }
                }
            }
          }
        `
  )

  const routes = edges.map(edge => edge.node) as Route[];

  return (
    <Layout>
      <SEO title='Register for a ride' />
      <ContentWrapper>
        <h1>Register to ride</h1>

        <p>For all sanctioned rides, we require riders to sign the OCA consent waiver and read their Progressive Return to Cycling Policy.</p>

        <p>Please <a href="https://www.ontariocycling.org">visit the OCA Website for the latest information</a> regarding permissible club/team and group riding activities. </p>

        <p>If you have any questions, <a href="http://randonneursontario.ca/who/board.html">please contact your chapter VP</a>.</p>
      </ContentWrapper>

      <Callout>
        <ContentWrapper>
          <p>All rides must be submitted at least a week prior to the start date, and are not approved until the chapter VP has confirmed with the rider.</p>
          <RegistrationForm routes={routes} />
        </ContentWrapper>
      </Callout>
    </Layout>
  )
}

export default Registration
