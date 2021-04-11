import React from "react"

import { graphql, useStaticQuery } from "gatsby"
import { Layout } from "src/components/layout"
import { SEO } from "src/components/seo"
import { ContentWrapper } from "src/components/content-wrapper"
import { Callout } from "src/components/callout"
import { LonelinessForm, LonelinessRoute } from "src/components/loneliness"
import Routes from "src/data/loneliness-routes.yaml"
import Riders from "src/data/loneliness-riders.yaml"
import Logo from "../assets/ClubAudax.svg"
import { TabMenu } from "src/components/tabmenu"

import * as style from "../styles/loneliness.module.scss"

export const lonelinessRoutes = [
  { label: 'Club', route: '/loneliness/' },
  { label: 'Shop', route: '/shop/audax-a-distance/' },
]

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
        <TabMenu tabs={lonelinessRoutes} activeRoute='/loneliness/' />
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
          <h2>The rules</h2>
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

        <h2>Current ride</h2>

        <p>We will be sharing new routes every two weeks.</p>
        {Routes.slice(0, 1).map((route, i) => (
          <LonelinessRoute key={i} {...route} />
        ))}
      </ContentWrapper>
      <LonelinessForm>
        <h2>Join Club audax à distance</h2>
        <p>
          If you have completed the current rides and abided by the rules, we
          warmly invite you to join our club.
        </p>
      </LonelinessForm>
      <ContentWrapper>
        <h2>Finishers</h2>
        <table>
          <thead><tr>
            <th>Rider</th>
            <th>Date completed</th>
            <th>Route</th>
          </tr></thead>
          <tbody>
            {Riders.map((rider, i) => (
              <tr key={i}>
                <td>
                  {rider.name.first.charAt(0)}. {rider.name.last}
                </td>
                <td>{rider.date}</td>
                <td>{rider.route}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ContentWrapper>
      <div className={style.slogan}>
        – distance makes the heart grow stronger –
      </div>
      <ContentWrapper>
        <h2>Previous rides</h2>
        {Routes.slice(1).map((route, i) => (
          <LonelinessRoute key={i} {...route} />
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