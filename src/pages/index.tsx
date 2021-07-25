import React from 'react'
import { Callout } from '../components/callout'
import { ContentChild, ContentWrapper } from '../components/content-wrapper'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { getDateTimeLong } from '../utils'
import { Layout } from '../components/layout'
import { graphql, useStaticQuery } from 'gatsby'
import { LinkButton } from 'src/components/buttons'
import { SEO } from '../components/seo'
import { useBrevets } from 'src/data/useBrevets'
import * as styles from './styles/index.module.scss'
import ClubAudax from './assets/ClubAudax.svg'
import { Link } from 'src/components/link'

const pageQuery = graphql`
query {
  allFile(
    filter: {extension: {regex: "/(jpg|JPG|jpeg)/"}, relativeDirectory: {eq: "gallery"}}
    limit: 9
  ) {
    nodes {
      name
      childImageSharp {
        gatsbyImageData(aspectRatio: 1, height: 300, formats: JPG)
      }
    }
  }
}
`

const IndexPage = () => {
  const {
    allFile: { nodes: images },
  } = useStaticQuery(pageQuery)
  const seoImage = getImage(images[0])
  const { brevets } = useBrevets({ chapter: 'Toronto' })

  return (
    <Layout>
      <SEO
        title='Home'
        description='Part of Randonneurs Ontario, a long distance cycling club affiliated with the Audax Club Parisien'
        image={seoImage} />
      <ContentWrapper>
        <Callout>
          <p>Sanctioned events are being approved on a case by case basis following OCA guidelines. <Link to="/registration">Register for upcoming events</Link>!</p>
        </Callout>
      </ContentWrapper>
      <ContentWrapper container>
        <ContentChild>
          <h3>Upcoming events</h3>
          <ul className={styles.eventWrapper}>
            {brevets.slice(0, 2).map(event => (
              <li key={event.id} className={styles.eventRow}>
                <strong>{event.route} {event.distance}</strong><br />
                <small>
                  {getDateTimeLong(new Date(event.date))}<br />
                  {event.startLocation}<br />
                  {event.rwgpsUrl && (<Link href={event.rwgpsUrl}>{`View ${event.route} route`}</Link>)}
                </small>
              </li>
            ))}
          </ul>
          <footer className={styles.eventFooter}>
            <LinkButton to='/registration/' primary small block>Register to ride</LinkButton>
          </footer>
        </ContentChild>

        <ContentChild>
          <p>
            <Link to='/loneliness/'>
              <ClubAudax alt={'Club audax à distance'} />
            </Link>
          </p>
          <p>
            If we must be alone in these tough times, let us be alone
            together.
          </p>
          <LinkButton primary block to='/loneliness/'>Learn more</LinkButton>
        </ContentChild>

        <ContentChild className={styles.gallery}>
          {images.map(image => (
            <GatsbyImage
              className={styles.galleryTile}
              key={image.name}
              image={image.childImageSharp.gatsbyImageData}
              alt={image.name}
            />
          ))}
        </ContentChild>
      </ContentWrapper>
    </Layout >
  )
}

export default IndexPage
