import React from 'react'

import {Layout} from '../components/layout';
import {SEO} from '../components/seo';
import {ContentWrapper} from '../components/content-wrapper';
import {LonelinessForm} from '../components/loneliness-form';
import style from './styles/loneliness.module.scss';

const iFrameStyle = {
  width: '1px', minWidth: '100%', height: '550px', border: 'none',
}

const Page = () => (
  <Layout>

    <SEO title='Club audax à distance' />
    <ContentWrapper>
      <h2 className={style.heading}>Club audax à distance</h2>
      
      <p>When asked to socially isolate, to stay away from loved ones for long time, what does an audax rider do?</p>

      <p>They ride as they always have. Alone.</p>

      <p>We are riders that are commited to socially distancing ourself, to do the right thing. But we're also commited to our sport. If we must be alone in these tough times, let us be alone together.</p>

      <section className={style.callout}>
      <h3>The rules</h3>
      <ol>
        <li>Ride isolated, no stopping, no support. Maintain social distance.</li>
        <li>Complete the given route within the given time limit.</li>
        <li>Starting locations can be at any point within the route.</li>
        <li>Record the ride on Strava, and submit the public activity link for credit.</li>
        <li>Long for the day when we can be together again.</li>
      </ol>
      <p><strong>These rides are unsanctioned.</strong> They are not connected to any official club, organization, or community. We maintain distance.</p>
      </section>

      <h3>The rides</h3>

      <h4>Giro del Toronto</h4>
      <iframe src="https://ridewithgps.com/embeds?type=route&id=32163869" style={iFrameStyle} scrolling="no"></iframe>


      <h3>Submission</h3>
      
      <LonelinessForm/>
      <div className={style.slogan}>– distance makes the heart grow stronger –</div>
    </ContentWrapper>
  </Layout>
)

export default Page
