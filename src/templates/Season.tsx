import React from 'react'
import { ContentWrapper } from 'src/components/content-wrapper'
import { getDateTimeLong } from 'src/utils'
import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'
import { PageTemplateType } from './types'
import { Event } from 'src/data/events'
import { Link } from 'src/components/link'
import { TabMenu } from 'src/components/tabmenu'
import { routes, SeasonsCTA } from 'src/pages/seasons'
import { Pagination } from './components/Pagination'
import { graphql } from 'gatsby'

type SeasonProps = PageTemplateType<{
  allEvent: {
    nodes: Event[]
  }
}>

export const query = graphql`
query SeasonQuery($id: String) {
  allEvent(filter: {season: {eq: $id}, chapter: {eq: Toronto }}) {
    nodes {
      chapter
      distance
      eventType
      id
      organizer
      route
      rwgpsUrl
      startLocation
      date
      season
    }
  }
}
`

const Season = ({pageContext: {pageInfo, id}, uri, data: {allEvent: {nodes: events}}}: SeasonProps) => (
  <Layout>
    <SEO
      title={`${pageInfo.title} | Season`}
      description={`${id}`}
      />
      <ContentWrapper>
        <TabMenu activeRoute={`${uri}/`} tabs={routes} />
        <h1>{pageInfo.title} Season</h1>
        <p><Link href={`https://randonneursontario.ca/result/torres${pageInfo.title.slice(-2)}.html`}>View official results</Link></p>

        <table>
          <thead><tr>
            <th>Distance</th>
            <th>Route</th>
            <th>Starting time</th>
            <th>Starting location</th>
          </tr></thead>
          <tbody>
            {events.map((event, i) => (
              <tr key={i} >
                <td>{event.distance}<br/>{event.eventType}</td>
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

      <Pagination pageInfo={pageInfo} />

      <SeasonsCTA />

  </Layout>
)

export default Season
