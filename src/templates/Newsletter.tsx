import React from 'react'
import { Callout } from 'src/components/callout'
import { ContentWrapper } from 'src/components/content-wrapper'
import { getDateLong } from 'src/utils'
import { graphql } from 'gatsby'
import { Layout } from 'src/components/layout'
import { LinkButton } from 'src/components/Buttons'
import { SEO } from 'src/components/seo'
import { Pagination } from './components/Pagination'
import { PageTemplateType } from './types'
import { newsletter } from './newsletter.module.scss'

type NewsletterProps = PageTemplateType<{
  mail: {
    categories: string[]
    content: string
    id: string
    name: string
    sentAt: string
    subject: string
    teaser: string
  }
}>

export const query = graphql`
  query NewsletterQuery($id: String) {
    mail(id: {eq: $id}) {
      categories
      content
      id
      name
      sentAt
      subject
      teaser
    }
  }
`

const Newsletter = ({pageContext: {id, pageInfo}, data: {mail: {subject, teaser, sentAt, content, name}}}: NewsletterProps) => (
  <Layout>
    <SEO
      title={`${pageInfo.title} | ${subject} | Newsletter`}
      description={teaser}
      />
      <ContentWrapper>
        <h1>{name}</h1>
        <p><em>Sent on {getDateLong(new Date(sentAt))}</em></p>
        <hr/>
        <h2>{subject}</h2>
        <article className={newsletter} dangerouslySetInnerHTML={{__html: content}} />
      </ContentWrapper>

      <Pagination pageInfo={pageInfo} />

      <Callout alternative>
        <ContentWrapper>
          <h2>Join the Randolist</h2>
          <p>The Randonneurs Ontario mailing list is a forum for club members to discuss upcoming rides and events, car pooling, and items of general interest, as well as a way for the club Executive and ride organizers to pass along information to the membership.</p>
          <p><LinkButton secondary block href="https://randonneursontario.ca/who/Mailing_Lists.html">Join the Randolist</LinkButton></p>
        </ContentWrapper>
      </Callout>
  </Layout>
)

export default Newsletter
