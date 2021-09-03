import React from 'react'
import { ContentWrapper } from 'src/components/content-wrapper'

import {Layout} from '../components/layout'
import {SEO} from '../components/seo'

const NotFoundPage = () => (
  <Layout>
    <SEO title='404: Not found' />
    <ContentWrapper>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </ContentWrapper>
  </Layout>
)

export default NotFoundPage
