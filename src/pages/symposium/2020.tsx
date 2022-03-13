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
        title='2020 Virtual Symposium'
        description='Randonneurs Ontario is a long distance cycling club that has been riding out of Toronto since 1983. We normally do an in-person New Members night for folks to learn more about our long distance rides, but are going fully remote this year!</p>'
      />
      <ContentWrapper>
        <TabMenu section='symposium' activeRoute={path} />
      </ContentWrapper>
      <ContentWrapper>
        <h1>2020 Symposium</h1>
        <iframe
          className={iframe}
          title='2020 Symposium slides'
          src="https://docs.google.com/presentation/d/e/2PACX-1vSBrU2MhTLpcnWZq155MfLKkXUmgh625Twg8RHRELQeEdXUqYx3LH8uUBDphyziwf5kUcOgxmMhJnQq/embed?start=false&loop=false&delayms=3000"
          frameBorder="0"
          allowFullScreen></iframe>
      </ ContentWrapper>
      <ContentWrapper container>
        <ContentChild>
        <p>Randonneurs Ontario (Canada) usually has a new members night every year for folks to ask questions about randonneuring. Since we've gone fully virtual this year, you don't have to be in Ontario to join!</p>

        <p>Join Randonneurs Ontario (Canada) on 17 February 2021 at 7:00pm EST (4:00pm PST) on Zoom for the first ever RO Virtual Symposium! A perfect way to get better acquainted with randonneuring and to help you pull through the winter to get to the season start.</p>

        <p>List of Topics:</p>

        <ul>
          <li>History of Randonneuring and Randonneurs Ontario</li>
          <li>Technique: equipment, nutrition, night riding, etc.</li>
          <li>Categories of rides: Populaires, Permanents, Brevets, Super Randonneur</li>
          <li>Entertainment Series, Devil’s Week</li>
          <li>Flèche</li>
          <li>Grand Brevets, Granite Anvil</li>
          <li>Paris-Brest-Paris</li>
        </ul>

        <p>To be followed by a Panel Discussion (Q&A)</p>
        </ContentChild><ContentChild>
          <iframe
            className={iframe}
            title='2020 Symposium video recording'
            src='https://www.youtube.com/watch?v=Cv1T2KV6UwI'
            frameBorder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen></iframe>
        </ContentChild>
      </ContentWrapper>
    </Layout>
  )
}

export default Page
