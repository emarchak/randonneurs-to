
import React from 'react'
import { ContentWrapper, ContentChild } from "src/components/content-wrapper"
import { Layout } from 'src/components/layout'
import { lonelinessRoutes } from '../loneliness'
import { SEO } from 'src/components/seo'
import { TabMenu } from 'src/components/tabmenu'
import Loadable from "@loadable/component"
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'src/components/link'

const BuyButton = Loadable(() => import('../../components/buybutton'))

const imageQuery = graphql`
query {
    allFile(filter: {name: {glob: "audax-a-distance"}}, limit: 1) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(aspectRatio: 1)
            fixed {
                src
              } 
          }
        }
      }
}
`

const AudaxShopPage = () => {
    const {
        allFile: { nodes: images },
    } = useStaticQuery(imageQuery)
    return (
        <Layout>
            <SEO
                title="Club audax à distance patches"
                description="A custom patch to celebrate riding by your lonesome! Club Audax à Distance is a play on long distance relationships and the time we spend together."
                image={images[0].childImageSharp.fixed.src}
            />
            <ContentWrapper>
                <TabMenu tabs={lonelinessRoutes} activeRoute='/shop/audax-a-distance/' />
            </ContentWrapper>
            <ContentWrapper container>
                <ContentChild>
                    <h1>Club Audax à Distance</h1><h2>cycling patch</h2>
                    <p>A custom patch to celebrate riding by your lonesome! <em>Club Audax à Distance</em> is a play on "long distance relationships" and the time we spend together. Get your own randonneuring cycling patch to put on bags, jerseys, tool pouches, or put in your map pouch!</p>

                    <p>Patches are 1.5" x 4.5", and have an iron-on backing.</p>

                    <p>Made in Toronto by <Link href='http://www.sugarbomb.ca/'>Sugarbomb</Link>, designed by <Link href='http://www.garethfowler.com/'>Gareth Fowler</Link>.</p>

                    <BuyButton productId={5609667035158} price buttonWithQuantity />
                </ContentChild>
                <ContentChild>
                    {images.map(image => (
                        <GatsbyImage
                            key={image.name}
                            image={image.childImageSharp.gatsbyImageData}
                            alt="A custom patch to celebrate riding by your lonesome! Club Audax à Distance is a play on long distance relationships and the time we spend together."
                        />))}
                </ContentChild>
            </ContentWrapper>
        </Layout >
    )

}
export default AudaxShopPage