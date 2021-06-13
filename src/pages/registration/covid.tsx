import React from 'react'
import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'
import { ContentChild, ContentWrapper } from "src/components/content-wrapper"
import { CovidForm } from 'src/components/registration/components/CovidForm'

const CovidScreening = () => {
    return (
        <Layout hideHeader>
            <SEO title='COVID screening form' />
            <ContentWrapper>
                <h1>COVID screening form</h1><h2>of Randonneurs Ontario</h2>
            </ContentWrapper>
            <CovidForm formUrl="/registration/covid" />
        </Layout >
    )
}
export default CovidScreening
