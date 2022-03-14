
import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Loadable from "@loadable/component"
import { ContentWrapper, ContentChild } from "src/components/content-wrapper"
import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'
import { TabMenu } from 'src/components/Menu'
import { Link } from 'src/components/Link'

import { routes as lonelinessRoutes } from '../loneliness'

const BuyButton = Loadable(() => import('../../components/buybutton'))

const imageQuery = graphql`
query {
      file(name: {glob: "audax-a-distance"}) {
        name
        childImageSharp {
          gatsbyImageData(aspectRatio:1, width:500)
        }
      }
}
`

const AudaxShopPage = () => {
    const { file } = useStaticQuery(imageQuery)
    const image = getImage(file)
    return (
        <Layout>
            <SEO
                title="Club audax à distance patches"
                description="A custom patch to celebrate riding by your lonesome! Club Audax à Distance is a play on long distance relationships and the time we spend together."
                image={image}
            />
            <ContentWrapper>
                <TabMenu section='loneliness' activeRoute='/shop/audax-a-distance/' />
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
                    <GatsbyImage
                        image={image}
                        alt="A custom patch to celebrate riding by your lonesome! Club Audax à Distance is a play on long distance relationships and the time we spend together."
                    />
                </ContentChild>
            </ContentWrapper>
        </Layout >
    )

}
export default AudaxShopPage
