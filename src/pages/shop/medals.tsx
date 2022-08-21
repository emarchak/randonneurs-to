
import React from 'react'
import { graphql, PageProps, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { ContentWrapper, ContentChild } from "src/components/content-wrapper"
import { Layout } from 'src/components/layout'
import { Link } from 'src/components/Link'
import { LinkButton } from 'src/components/Buttons'
import { SEO } from 'src/components/seo'
import { TabMenu } from 'src/components/Menu'

const imageQuery = graphql`
query {
  file(name: {glob: "brm-medal-2023"}) {
    name
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH)
    }
  }
}
`

const MedalsShopPage = ({path}: PageProps) => {
  const { file } = useStaticQuery(imageQuery)
  const image = getImage(file)
  return (
    <Layout>
      <ContentWrapper>
        <TabMenu section='shop' activeRoute={path} />
        <h1>Brevets Randonneurs Mondiaux</h1><h2>medals</h2>
      </ContentWrapper>
      <ContentWrapper container>
        <ContentChild>
          <p><GatsbyImage
            image={image}
            alt="A custom patch to celebrate riding by your lonesome! Club Audax à Distance is a play on long distance relationships and the time we spend together."
          /></p>
          <p>
            <LinkButton primary block href='http://www.randonneursontario.ca/store/store.html'>
              Shop medals
            </LinkButton>
          </p>
        </ContentChild>
        <ContentChild>
          <p>Since 1975, the Audax Club Parisien has required all PBP riders to complete a full brevet series to qualify for their 1200km Paris-Brest-Paris 1200km grand brevet. A series consists of completing a 200k, 300k, 400k and 600k brevet within one season.</p>

          <p>Those brevets were originally called <em lang="fr">Brevets Randonneurs Français</em>, in 1976 they became <em lang="fr">Brevets Randonneurs Européens</em>, and in 1983 <em lang="fr">Brevets Randonneurs Mondiaux</em>.</p>

          <p>
            <Link href='https://www.audax-club-parisien.com/en/our-organizations/brm-world/#:~:text=Article%2013,will%20change%20after%20each%20PBP.'>From the BRM rules</Link>:
            <blockquote>
                Article 13. The medals noting the successful completion of the brevets are: a bronze medal for 200 KM, a silver-plate medal for 300 KM, a vermilion medal for 400 KM, a gold medal for 600 KM, and a silver medal for 1000 KM. The design of the medals will change after each PBP.
            </blockquote>
          </p>
          <p>You can purchase these medals through Randonneurs Ontario at the end of each season </p>

          <p>If you have completed a full brevet series within a season, Randonneurs Ontario covers the cost of a Super Randonneur medal for you.</p>
        </ContentChild>
      </ContentWrapper>
    </Layout >
  )
}

export const Head = () => {
  const { file } = useStaticQuery(imageQuery)
  const image = getImage(file)
  return (
      <SEO
        title="Brevets Randonneurs Mondiaux medals"
        description="A custom patch to celebrate riding by your lonesome! Club Audax à Distance is a play on long distance relationships and the time we spend together."
        image={image}
    />
  )
}

export default MedalsShopPage
