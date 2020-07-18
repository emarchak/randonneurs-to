import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import moment from "moment"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { ContentWrapper } from "../components/content-wrapper"
import { Callout } from "../components/callout"
import ClubAudax from "./assets/ClubAudax.svg"
import styles from "./styles/index.module.scss"

const IndexPage = () => {
  const {
    allFile: { nodes: images },
    allEvent: { nodes: events },
  } = useStaticQuery(
    graphql`
      query {
        allEvent(
          sort: { order: ASC, fields: starts_on }
          filter: {
            tag_names: { in: "Toronto" }
            starts_on: { gte: "2020-07-11" }
          }
        ) {
          nodes {
            slug
            name
            starts_at
            location
          }
        }
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
          All official brevets, permanents and populaires are cancelled until
          further notice. Please check the{" "}
          <a href="http://randonneursontario.ca">Randonneurs Ontario website</a>{" "}
          for updates.
        </Callout>
        <div className={styles.homeWrapper}>
          <section className={styles.updates}>
            <h3>Upcoming events</h3>
            <ul>
              {events.map(event => (
                <li key={event.slug}>
                  <h4>{event.name}</h4>
                  <p>
                    {moment(event.starts_at).format("MMMM DD YYYY, HH:mm")}
                    <br />
                    {event.location}
                    <br />
                    <a href={`https://ridewithgps.com/events/${event.slug}`}>
                      View event
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </section>
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
