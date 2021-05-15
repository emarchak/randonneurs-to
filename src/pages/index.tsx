import React from 'react'
import { Callout } from '../components/callout'
import { ContentChild, ContentWrapper } from '../components/content-wrapper'
import { GatsbyImage } from 'gatsby-plugin-image'
import { getDateTimeLong } from '../utils'
import { Layout } from '../components/layout'
import { graphql, useStaticQuery } from 'gatsby'
import { LinkButton } from 'src/components/form/buttons'
import { SEO } from '../components/seo'
import { useBrevets } from '../hooks/useBrevets'
import * as styles from './styles/index.module.scss'
import ClubAudax from './assets/ClubAudax.svg'
import { Link } from 'src/components/form/link'

const pageQuery = graphql`
query {
  allFile(
    filter: {extension: {regex: "/(jpg|JPG|jpeg)/"}, relativeDirectory: {eq: "gallery"}}
    limit: 9
  ) {
    nodes {
      name
      childImageSharp {
        gatsbyImageData(aspectRatio: 1, height: 150, formats: JPG)
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
          <p>Due to the most recent provincewide declaration of emergency and stay-at-home order, as well as the cancellation of all organized cycling events by the Ontario Cycling Association (OCA), all Randonneurs Ontario organized Populaires and Brevets have been cancelled until further notice. These may be rescheduled at a later date depending on provincial and local health authority directives.</p>
          <p>However, we have been notified by OCA that we can still offer our <Link to='/registration/permanent/'>Permanents program.</Link></p>
        </Callout>
      </ContentWrapper>
      <ContentWrapper container>
        {/* <ContentChild>
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
        </ContentChild> */}

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
