import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { ContentWrapper } from "../components/content-wrapper"
import { Callout } from "../components/callout"
import ClubAudax from "./assets/ClubAudax.svg"
import styles from "./styles/index.module.scss"

export const query = graphql`
  query {
    allFile(
      filter: {
        extension: { regex: "/(jpg|JPG|jpeg)/" }
        relativeDirectory: { eq: "gallery" }
      }
      limit: 9
    ) {
      nodes {
        name
        childImageSharp {
          fluid(maxWidth: 150, maxHeight: 150, quality: 100) {
            ...GatsbyImageSharpFluid
            presentationWidth
          }
        }
      }
    }
  }
`

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <ContentWrapper>
      <Callout>
        All oficial brevets, permanents and populaires are cancelled until
        further notice. Please check the{" "}
        <a href="http://randonneursontario.ca">Randonneurs Ontario website</a>{" "}
        for updates.
      </Callout>
      <div className={styles.homeWrapper}>
        <section className={styles.updates}>
          <div>
            <Link
              style={{ borderBottomWidth: 0, display: "block" }}
              to="/loneliness"
            >
              <ClubAudax alt={"Club Audax a distance"} />
            </Link>
          </div>
          <p>
            If we must be alone in these tough times, let us be alone together.{" "}
            <Link to="/loneliness">Learn more.</Link>
          </p>
        </section>

        <section className={styles.gallery}>
          {data.allFile.nodes.map(image => (
            <Img
              className={styles.galleryTile}
              key={image.name}
              fluid={image.childImageSharp.fluid}
              alt={image.name}
            />
          ))}
        </section>
      </div>
    </ContentWrapper>
  </Layout>
)

export default IndexPage
