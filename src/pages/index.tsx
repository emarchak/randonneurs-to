import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { getDateTimeLong } from '../utils'
import Img from 'gatsby-image'
import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import { ContentWrapper } from '../components/content-wrapper'
import { Callout } from '../components/callout'
import ClubAudax from './assets/ClubAudax.svg'
import styles from './styles/index.module.scss'
import { useBrevets } from '../hooks/useBrevets'

const pageQuery = graphql`
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

const IndexPage = () => {
  const {
    allFile: { nodes: images },
  } = useStaticQuery(pageQuery)
  const { brevets } = useBrevets({ chapter: 'Toronto' })

  return (
    <Layout>
      <SEO title='Home' />
      <ContentWrapper>
        <Callout>
          <p>Sanctioned events are being approved on a case by case basis. <Link to="/registration">Register for upcoming events</Link>!</p>
        </Callout>
        <div className={styles.homeWrapper}>
          <section className={styles.updates}>
            <h3>Upcoming events</h3>
            <ul className={styles.eventWrapper}>
              {brevets.slice(0, 2).map(event => (
                <li key={event.id} className={styles.eventRow}>
                  <strong>{event.route} {event.distance}</strong><br />
                  <small>
                    {getDateTimeLong(new Date(event.date))}<br />
                    {event.startLocation}<br />
                    {event.rwgpsUrl && (<a href={event.rwgpsUrl} target="_blank">View {event.route} route</a>)}
                  </small>
                </li>
              ))}
            </ul>
            <footer className={styles.eventFooter}>
              <Link className={styles.eventCta} to='/registration'>Register</Link>
            </footer>
          </section>

          <section className={styles.updates}>
            <p>
              <Link
                style={{ borderBottomWidth: 0, display: 'block' }}
                to='/loneliness'
              >
                <ClubAudax alt={'Club audax à distance'} />
              </Link>
            </p>
            <p>
              If we must be alone in these tough times, let us be alone
              together. <Link to='/loneliness'>Learn more.</Link>
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
