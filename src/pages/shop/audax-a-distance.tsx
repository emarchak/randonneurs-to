
import React from 'react'
import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'
import { ContentWrapper, ContentChild } from "src/components/content-wrapper"
import { Callout } from "src/components/callout"
import Loadable from "@loadable/component"

const BuyButton = Loadable(() => import('src/components/buybutton'))

const AudaxShopPage = () => {
    return (
        <Layout>
            <SEO
                title="Club audax à distance patches"
                description="Purchase patches for Club audax à distance. We are riders that are commited to socially distancing ourself, to do
            the right thing. If we must be alone in these tough times, let us be alone together."
            />
            <ContentWrapper container>
                <ContentChild>
                    <h1>Club Audax à Distance</h1><h2>cycling patch</h2>

                    <p>A custom patch to celebrate riding by your lonesome! <em>Club Audax à Distance</em> is a play on "long distance relationships" and the time we spend together. Get your own randonneuring cycling patch to put on bags, jerseys, tool poutches, or put in your map pouch!</p>

                    <p>Patches are 1.5" x 4.5", and have an iron-on backing.</p>

                    <p>Made in Toronto by <a href='http://www.sugarbomb.ca/'>Sugarbomb</a>, designed by <a href='http://www.garethfowler.com/'>Gareth Fowler</a>.</p>
                </ContentChild>
                <ContentChild>
                    <BuyButton productId={5609667035158} price img buttonWithQuantity />
                </ContentChild>
            </ContentWrapper>
        </Layout >
    )

}
export default AudaxShopPage