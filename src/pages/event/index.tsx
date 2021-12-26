import React from 'react'
import { graphql, PageProps, useStaticQuery } from 'gatsby'
import { ContentChild, ContentWrapper } from "src/components/content-wrapper"
import { Gallery } from 'src/components/Gallery'
import { Layout } from 'src/components/layout'
import { Link } from 'src/components/link'
import { SeasonsCta } from 'src/components/seasons'
import { SEO } from 'src/components/seo'
import { TabMenu } from 'src/components/Menu'

const pageQuery = graphql`
query {
  allSitePage(
    filter: {context: {type: {eq: season}}}
    sort: {fields: context___pageInfo___title, order: DESC}
  ) {
    nodes {
      path
      id
      context {
        pageInfo {
          title
        }
      }
    }
  }
}
`

const Seasons = ({path}: PageProps) => {
    const {
      allSitePage: { nodes: seasons },
    } = useStaticQuery(pageQuery)

    return (
      <Layout>
        <SEO title='Events' />
        <ContentWrapper>
        <TabMenu section='registration' activeRoute={path} />
          <h1>Events of </h1><h2>of Randonneurs Ontario</h2>

          <p>Randonneurs Ontario have been running ACP approved brevets since at least 1982. Here are some of our past seasons.</p>
          <p>To view the full results of these seasons, <Link href="https://randonneursontario.ca/history/heath.html">visit our results archive</Link>.</p>
        </ContentWrapper>
        <ContentWrapper container>
          <ContentChild>
            <ul>
            {seasons.map(({ path, id, context: { pageInfo: { title } } }) => (
              <li key={id}>
                <Link to={path}>{title} Season</Link>
              </li>
            ))}
            </ul>
          </ContentChild>
          <ContentChild><Gallery /></ContentChild>
        </ContentWrapper>
        <SeasonsCta />
      </Layout >
    )
}

export default Seasons
