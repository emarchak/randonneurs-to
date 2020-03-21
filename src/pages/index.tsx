import React from 'react'

import {Layout} from '../components/layout';
import {SEO} from '../components/seo';
import {ContentWrapper} from '../components/content-wrapper';
const IndexPage = () => (
  <Layout>

    <SEO title='Home' />
    <ContentWrapper>
    <p>Automations for Randonneurs Toronto.</p>
    </ContentWrapper>
  </Layout>
)

export default IndexPage
