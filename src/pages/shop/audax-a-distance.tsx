
import React from 'react'
import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'
import { ContentChild, ContentWrapper } from "src/components/content-wrapper"
import { Callout } from "src/components/callout"
import { BuyButton } from 'src/components/buybutton'

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

                    <p>A custom patch to celebrate riding by your lonesome! <em>Club Audax à Distance</em> is a play on "long distance relationships" and the time we spend together.</p>

                    <p>They're made in Toronto, approx. 1.5" x 4.5", and have an iron-on backing. CO₂ canister for scale!</p>
                    <p>Get your own randonneuring cycling patch to put on bags, jerseys, tool poutches, or put in your map pouch</p>
                </ContentChild>
                <ContentChild>
                    <BuyButton productId={5609667035158} img buttonWithQuantity />
                </ContentChild>
            </ContentWrapper>
            <Callout alternative>
                <ContentWrapper>
                    <h3>Shipping</h3>
                    <dl>
                        <dt>Canada</dt>
                        <dd>...</dd>

                        <dt>USA</dt>
                        <dd>...</dd>

                        <dt>International</dt>
                        <dd>...</dd>
                    </dl>

                </ContentWrapper>
            </Callout>
        </Layout >
    )

}
export default AudaxShopPage