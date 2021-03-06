import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { ContentWrapper } from "../components/content-wrapper"
import { Callout } from "../components/callout"
import ClubAudax from "./assets/ClubAudax.svg"
import * as styles from "./styles/index.module.scss"

const IndexPage = () => {
  const {
    allFile: { nodes: images },
  } = useStaticQuery(
    graphql`
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
  )

  return (
    <Layout>
      <SEO title="Home" />
      <ContentWrapper>
        <Callout>
          <p>Sanctioned events are being approved on a case by case basis. <Link to="/registration">Register for upcoming events</Link>!</p>
        </Callout>
        <div className={styles.homeWrapper}>
          <section className={styles.updates}>
            <p>
              <Link
                style={{ borderBottomWidth: 0, display: "block" }}
                to="/loneliness"
              >
                <ClubAudax alt={"Club audax à distance"} />
              </Link>
            </p>
            <p>
              If we must be alone in these tough times, let us be alone
              together. <Link to="/loneliness">Learn more.</Link>
            </p>
          </section>

          <section className={styles.gallery}>
            {images.map(image => (
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
}

export default IndexPage
