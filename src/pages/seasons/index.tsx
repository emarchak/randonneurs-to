import React from 'react'
import { Callout } from 'src/components/callout'
import { ContentChild, ContentWrapper } from "src/components/content-wrapper"
import { GatsbyImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'
import { Layout } from 'src/components/layout'
import { Link } from 'src/components/link'
import { LinkButton } from 'src/components/Buttons'
import { SEO } from 'src/components/seo'
import { TabMenu } from 'src/components/tabmenu'
import { gallery, galleryTile } from '../styles/index.module.scss'

export const routes = [
    { label: '2021', route: '/seasons/2021/' },
    { label: '2020', route: '/seasons/2020/' },
    { label: '2019', route: '/seasons/2019/' },
    { label: 'Archive', route: '/seasons/' }
  ]

const pageQuery = graphql`
query {
  allFile(
    filter: {extension: {regex: "/(jpg|JPG|jpeg)/"}, relativeDirectory: {eq: "gallery"}}
    limit: 9
    sort: {fields: birthTime, order: ASC}
  ) {
    nodes {
      name
      childImageSharp {
        gatsbyImageData(aspectRatio: 1, height: 300, formats: JPG)
      }
    }
  }
  allSitePage(
    filter: {context: {type: {eq: "event"}}}
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

export const SeasonsCTA = () => (
<Callout alternative>
  <ContentWrapper>
    <h3>About us</h3>
    <p>The Toronto Randonneurs are a chapter of Randonneurs Ontario ultra-distance cycling club. We've been riding long distance rides from of Toronto and southern Ontario since 1982.</p>
    <p><Link href='https://randonneursontario.ca/'>Randonneurs Ontario</Link> is affiliated with the <Link href='https://www.audax-club-parisien.com/en'>Audax Club Parisien</Link>, the parent organization governing the qualification of riders wishing to participate in the 1200K Paris - Brest - Paris Randonnee. The club is also affiliated with <Link href='https://www.audax-club-parisien.com/en/our-organizations/brm-world/'>Les Randonneurs Mondiaux</Link>, which provides recognition for brevets other than Paris - Brest - Paris that are longer than 1000K.</p>
    <p><LinkButton to='/registration/' secondary block>Register to ride with us</LinkButton></p>
  </ContentWrapper>
</Callout>)

const Seasons = () => {
    const {
      allFile: { nodes: images },
      allSitePage: { nodes: seasons },
    } = useStaticQuery(pageQuery)

    return (
        <Layout>
            <SEO title='Seasons' />
            <ContentWrapper>
              <TabMenu activeRoute={'/season/'} tabs={routes} />
              <h1>Seasons</h1><h2>of Randonneurs Ontario</h2>

              <p>Randonneurs Ontario have been running ACP approved brevets since at least 1982. Here are some of our past seasons.</p>
              <p>To view the full results of these seasons, <Link href="https://randonneursontario.ca/history/heath.html">visit our results archive</Link>.</p>
            </ContentWrapper>
            <ContentWrapper container>
                <ContentChild>
                  <ul>
                  {seasons.map(({ path, id, context: { pageInfo: { title } } }) => (
                    <li key={id}>
                      <Link to={path}>{title}</Link>
                    </li>
                  ))}
                  </ul>
                </ContentChild>
                <ContentChild className={gallery}>
                {images.map(image => (
                  <GatsbyImage
                    className={galleryTile}
                    key={image.name}
                    image={image.childImageSharp.gatsbyImageData}
                    alt={image.name}
                  />
                ))}
              </ContentChild>
            </ContentWrapper>
            <SeasonsCTA />
        </Layout >
    )
}

export default Seasons
