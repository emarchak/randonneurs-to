import React from "react"

import { graphql, useStaticQuery } from "gatsby"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { ContentWrapper } from "../components/content-wrapper"
import { Callout } from "../components/callout"
import { LonelinessForm, LonelinessRoute } from "../components/loneliness"

import Routes from "../data/loneliness-routes.yaml"
import Riders from "../data/loneliness-riders.yaml"
import Logo from "./assets/ClubAudax.svg"
import style from "./styles/loneliness.module.scss"

const Page = () => {
  const {
    file: {
      childImageSharp: { fixed: metaImage },
    },
  } = useStaticQuery(
    graphql`
      query {
        file(relativePath: { eq: "ClubAudax.png" }) {
          childImageSharp {
            fixed(width: 1200) {
              src
            }
          }
        }
      }
    `
  )

  return (
    <Layout>
      <SEO
        title="Club audax à distance"
        description="We are riders that are commited to socially distancing ourself, to do
        the right thing. If we must be alone in these tough times, let us be alone together."
        image={metaImage.src}
      />
      <ContentWrapper>
        <Logo className={style.heading} alt="Club audax à distance" />
        <p>
          When asked to socially isolate, to stay away from loved ones for long
          time, what does an audax rider do?
        </p>

        <p>They ride as they always have. Alone.</p>

        <p>
          We are riders that are commited to socially distancing ourself, to do
          the right thing. But we're also commited to our sport. If we must be
          alone in these tough times, let us be alone together.
        </p>

        <p>
          <a href="https://www.cycleto.ca/news/cycling-time-covid-19">
            Learn how to cycle during a pandemic from Cycle Toronto
          </a>
          .
        </p>

        <Callout>
          <h3>The rules</h3>
          <ol>
            <li>
              Ride isolated, no stopping, no support. Maintain social distance.
            </li>
            <li>Complete the given route by the given deadline.</li>
            <li>Starting locations can be at any point within the route.</li>
            <li>
              Record the ride on Strava, and submit the public activity link for
              credit.
            </li>
            <li>Long for the day when we can be together again.</li>
          </ol>
          <p>
            <strong>These rides are unsanctioned.</strong> They are not
            connected to any official club, organization, or community. We
            maintain distance.
          </p>
        </Callout>

        <h3>Current ride</h3>

        <p>We will be sharing new routes every two weeks.</p>
        {Routes.slice(0, 1).map(route => (
          <LonelinessRoute {...route} />
        ))}
      </ContentWrapper>
      <LonelinessForm>
        <h3>Join Club audax à distance</h3>
        <p>
          If you have completed the current rides and abided by the rules, we
          warmly invite you to join our club.
        </p>
      </LonelinessForm>
      <ContentWrapper>
        <h3>Finishers</h3>
        <table>
          <thead>
            <th>Rider</th>
            <th>Date completed</th>
            <th>Route</th>
          </thead>
          {Riders.map(rider => (
            <tr>
              <td>
                {rider.name.first.charAt(0)}. {rider.name.last}
              </td>
              <td>{rider.date}</td>
              <td>{rider.route}</td>
            </tr>
          ))}
        </table>
      </ContentWrapper>
      <div className={style.slogan}>
        – distance makes the heart grow stronger –
      </div>
      <ContentWrapper>
        <h3>Previous rides</h3>
        {Routes.slice(1).map(route => (
          <LonelinessRoute {...route} />
        ))}

        <Logo className={style.heading} alt="Club audax à distance" />
        <p style={{ textAlign: "center" }}>
          Wordmark designed by{" "}
          <a href="http://garethfowler.com/">Gareth Fowler</a>
        </p>
      </ContentWrapper>
    </Layout>
  )
}

export default Page
