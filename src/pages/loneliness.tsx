import React from "react"

import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { ContentWrapper } from "../components/content-wrapper"
import { LonelinessForm } from "../components/loneliness-form"
import Logo from "./assets/ClubAudux.svg"
import style from "./styles/loneliness.module.scss"

const Page = () => (
  <Layout>
    <SEO title="Club audax à distance" />
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

      <section className={style.callout}>
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
          <strong>These rides are unsanctioned.</strong> They are not connected
          to any official club, organization, or community. We maintain
          distance.
        </p>
      </section>

      <h3>The rides</h3>

      <p>We will be sharing new routes every two weeks.</p>

      <article className={style.ride}>
        <div>
          <h4>1. Giro del Toronto</h4>
          <h5>Posted on April 10, 2020</h5>
          <h5>Complete by April 24, 2020</h5>

          <p>
            A circle around the city, a route that hasn't been used in over a
            decade, roads that were bustling now sit empty.
          </p>
        </div>
        <iframe
          src="https://ridewithgps.com/embeds?type=route&id=32322586"
          className={style.iframe}
          scrolling="no"
        />
      </article>
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
      <p>A list will be posted as our travellers arrive.</p>
    </ContentWrapper>
    <div className={style.slogan}>
      – distance makes the heart grow stronger –
    </div>
  </Layout>
)

export default Page
