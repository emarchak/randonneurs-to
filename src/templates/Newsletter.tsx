import React from 'react'
import { Callout } from 'src/components/callout'
import { ContentChild, ContentWrapper } from 'src/components/content-wrapper'
import { getDateLong } from 'src/utils'
import { Layout } from 'src/components/layout'
import { LinkButton } from 'src/components/Buttons'
import { SEO } from 'src/components/seo'

import { newsletter } from './newsletter.module.scss'
import { PageTemplateType } from './types'

type NewsletterProps = PageTemplateType<{
  categories: string[]
  name: string
  subject: string
  sentAt: string
  content: string
  teaser: string
  id: string
}>

const Newsletter = ({pageContext: {name, content, subject, teaser, sentAt, pageInfo}}: NewsletterProps) => (
  <Layout>
    <SEO
      title={`${name} | ${subject} | Newsletter`}
      description={teaser}
      />
      <ContentWrapper>
        <h1>{name}</h1>
        <p><em>Sent on {getDateLong(new Date(sentAt))}</em></p>
        <hr/>
        <h2>{subject}</h2>
        <article className={newsletter} dangerouslySetInnerHTML={{__html: content}} />
      </ContentWrapper>

      <ContentWrapper container>
        <ContentChild>
          {pageInfo.prevUrl && <LinkButton primary block to={`/${pageInfo.prevUrl}`}>{'<< Previous newsletter'}</LinkButton>}
        </ContentChild>
        <ContentChild>
          {pageInfo.nextUrl && <LinkButton primary block to={`/${pageInfo.nextUrl}`}>{'Next newsletter >>'}</LinkButton>}
        </ContentChild>
      </ContentWrapper>

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
