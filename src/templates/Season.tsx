import React from 'react'
import { ContentChild, ContentWrapper } from 'src/components/content-wrapper'
import { getDateTimeLong } from 'src/utils'
import { Layout } from 'src/components/layout'
import { LinkButton } from 'src/components/Buttons'
import { SEO } from 'src/components/seo'
import { PageTemplateType } from './types'
import { Event } from 'src/data/events'
import { Link } from 'src/components/link'
import { TabMenu } from 'src/components/tabmenu'
import { routes } from 'src/pages/season'


type NewsletterProps = PageTemplateType<{
  id: string
  events: Event[]
}>

const Season = ({pageContext: {pageInfo, id, events }, uri}: NewsletterProps) => (
  <Layout>
    <SEO
      title={`${id} | Season`}
      description={`${id}`}
      />
      <ContentWrapper>
        <TabMenu activeRoute={`${uri}/`} tabs={routes} />
        <h1>{id} Season</h1>

        <table>
          <thead><tr>
            <th>Distance</th>
            <th>Event type</th>
            <th>Route</th>
            <th>Starting time</th>
            <th>Starting location</th>
          </tr></thead>
          <tbody>
            {events.map((event, i) => (
              <tr key={i} >
                <td>{event.distance}</td>
                <td>{event.eventType}</td>
                <td>
                  {event.route}
                  {event.rwgpsUrl && <>
                    <br />
                    <small>(<Link href={event.rwgpsUrl}>{`View ${event.route} route`}</Link>)</small>
                  </>}
                </td>
                <td>{getDateTimeLong(new Date(event.date))}</td>
                <td>{event.startLocation}</td>
              </tr>)
            )}
          </tbody>
        </table>
      </ContentWrapper>

      <ContentWrapper container>
        <ContentChild>
          {pageInfo.prevUrl && <LinkButton primary block to={`/${pageInfo.prevUrl}`}>{pageInfo.prevTitle}</LinkButton>}
        </ContentChild>
        <ContentChild>
          {pageInfo.nextUrl && <LinkButton primary block to={`/${pageInfo.nextUrl}`}>{pageInfo.nextTitle}</LinkButton>}
        </ContentChild>
      </ContentWrapper>
  </Layout>
)

export default Season
