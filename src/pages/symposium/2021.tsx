import React from 'react'
import { PageProps } from 'gatsby'
import { ContentChild, ContentWrapper } from 'src/components/content-wrapper'
import { iframe } from 'src/components/styles/iframe.module.scss'
import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'
import { TabMenu } from 'src/components/Menu'


const Page = ({path}: PageProps) => {

  return (
    <Layout>
      <SEO
        title='2021 Virtual Symposium'
        description='Randonneurs Ontario is a long distance cycling club that has been riding out of Toronto since 1983. We normally do an in-person New Members night for folks to learn more about our long distance rides, but are going fully remote this year!</p>'
      />
      <ContentWrapper>
        <TabMenu section='symposium' activeRoute={path} />
      </ContentWrapper>
      <ContentWrapper>
        <h1>2021 Symposium</h1>
        <iframe
          className={iframe}
          title='2021 Symposium slides'
          src="https://docs.google.com/presentation/d/e/2PACX-1vSSAEXbIM6BL7g8pkimj8wpkNpQk8N365oFZYOMq0cUzZ48ksLfRQ-JdUNkqbK5CVwQDXyMCbXqqXbp/embed?start=false&loop=false&delayms=3000"
          frameBorder="0"
          allowFullScreen></iframe>
      </ ContentWrapper>
      <ContentWrapper container>
        <ContentChild>
          <p>Randonneurs Ontario is a long-distance cycling club that has been riding out of Toronto, Canada since 1983. We normally do an in-person New Members night for folks to ask questions about randonneuring. Since we had such great success from doing an online symposium last year, we're doing it again. You don't have to be in Ontario to join!</p>

          <p>Join Randonneurs Ontario on 16 February 2022 at 7:00pm EST (4:00pm PST) on Zoom for our second Virtual Symposium! A perfect way to get better acquainted with randonneuring and to help you pull through the winter to get to the season start.</p>

          <p>List of Topics:</p>

          <ul>
            <li>Hardware: The right stuff for randonneuring</li>
            <li>Software: Nutrition, night riding, and mental toughness</li>
            <li>Categories of rides: Populaires, Permanents, Brevets, Super Randonneur</li>
            <li>Categories of rides: Brevets, Devil's Week and the flèche</li>
            <li>Randonneurs Ontario awards</li>
            <li>A first-hand experience riding a 1,000km brevet</li>
            <li>Moderated Q&A with the speakers</li>
          </ul>

        </ContentChild><ContentChild>
          <iframe
            className={iframe}
            title='2021 Symposium video recording'
            src='https://www.youtube.com/embed/1_QZSRRFpP4?start=203'
            frameBorder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen></iframe>
        </ContentChild>
      </ContentWrapper>
    </Layout>
  )
}

export default Page
