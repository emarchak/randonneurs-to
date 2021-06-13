import React from 'react'
import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'
import { ContentChild, ContentWrapper } from "src/components/content-wrapper"
import { CovidForm } from 'src/components/registration/components/CovidForm'
import { Link } from 'src/components/link'

const CovidScreening = () => {
    return (
        <Layout hideHeader>
            <SEO title='COVID screening form' />
            <ContentWrapper>
                <h1>COVID screening form</h1><h2>for Randonneurs Ontario</h2>
                <p>All riders must complete self-screen before starting a ride. A missing screening will result in a DNF. <Link href="https://www.randonneursontario.ca/who/whatis.html#COVID">Learn more about our COVID-19 policies</Link>.</p>
            </ContentWrapper>
            <CovidForm />
            <ContentWrapper>
                <p>Screening questionnaire based off of the <Link href="https://www.toronto.ca/wp-content/uploads/2020/05/95ea-Screening-poster-retail-entrance-TPH.pdf">Toronto Public Health screening</Link>.</p>
            </ContentWrapper>
        </Layout >
    )
}
export default CovidScreening
