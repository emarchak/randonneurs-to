import React from 'react'
import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'
import { ContentChild, ContentWrapper } from "src/components/content-wrapper"
import { TabMenu } from 'src/components/tabmenu'
import { LinkButton } from 'src/components/Buttons'
import { Link } from 'src/components/link'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { galleryTile, gallery } from '../styles/index.module.scss'

export const routes = [
    { label: '2021', route: '/season/2021/' },
    { label: '2020', route: '/season/2020/' },
    { label: '2019', route: '/season/2019/' },
    { label: 'Archive', route: '/season/' }
  ]

const pageQuery = graphql`
query {
  allFile(
    filter: {extension: {regex: "/(jpg|JPG|jpeg)/"}, relativeDirectory: {eq: "gallery"}}
    limit: 9
  ) {
    nodes {
      name
      childImageSharp {
        gatsbyImageData(aspectRatio: 1, height: 100, formats: JPG)
      }
    }
  }
}
`

const Seasons = () => {
    const {
        allFile: { nodes: images },
    } = useStaticQuery(pageQuery)


    return (
        <Layout>
            <SEO title='Seasons' />
            <ContentWrapper>
                <TabMenu activeRoute={'/season/'} tabs={routes} />
                <h1>Seasons</h1><h2>of Randonneurs Ontario</h2>

                <p>For all sanctioned rides, we require riders to have Ontario Cycling Association (OCA) membership. If you're not an OCA member, you can purchase a membership during registration.</p>
            </ContentWrapper>
        </Layout >
    )
}

export default Seasons
