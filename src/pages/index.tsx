import React from 'react'
import { Callout } from '../components/callout'
import { ContentChild, ContentWrapper } from '../components/content-wrapper'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { getDateTimeLong } from '../utils'
import { Layout } from '../components/layout'
import { graphql, useStaticQuery } from 'gatsby'
import { LinkButton } from 'src/components/buttons'
import { SEO } from '../components/seo'
import { useBrevets } from 'src/data/brevets'
import * as styles from './styles/index.module.scss'
import ClubAudax from './assets/ClubAudax.svg'
import { Link } from 'src/components/link'
import { useBlog } from 'src/data/blog'
import { PostTeaser } from 'src/components/Blog'

const pageQuery = graphql`
query {
  allFile(
    filter: {extension: {regex: "/(jpg|JPG|jpeg)/"}, relativeDirectory: {eq: "gallery"}}
    limit: 6
    sort: {fields: birthTime, order: DESC}
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
  const { brevets } = useBrevets({ chapter: 'Toronto', limit: 2 })
  const { posts } = useBlog({limit: 2})

  return (
    <Layout>
      <SEO
        title='Home'
        description='Part of Randonneurs Ontario, a long distance cycling club affiliated with the Audax Club Parisien'
        image={seoImage} />
      <ContentWrapper container>
        <ContentChild>
        <h3>About us</h3>
        <p>The Toronto Randonneurs are a chapter of Randonneurs Ontario ultra-distance cycling club.</p>
        <p><Link href='https://randonneursontario.ca/'>Randonneurs Ontario</Link> is affiliated with the <Link href='https://www.audax-club-parisien.com/en'>Audax Club Parisien</Link>, the parent organization governing the qualification of riders wishing to participate in the 1200K Paris - Brest - Paris Randonnee. The club is also affiliated with <Link href='https://www.audax-club-parisien.com/en/our-organizations/brm-world/'>Les Randonneurs Mondiaux</Link>, which provides recognition for brevets other than Paris - Brest - Paris that are longer than 1000K.</p>
        <LinkButton small secondary block href='https://randonneursontario.ca/who/index.html'>Learn more about Randonneurs Ontario</LinkButton>
        </ContentChild>
        <ContentChild>
          <h3>Upcoming events</h3>
          <ul className={styles.eventWrapper}>
            {brevets.map(event => (
              <li key={event.id} className={styles.eventRow}>
                <strong>{event.route} {event.distance}</strong><br />
                {getDateTimeLong(new Date(event.date))}<br />
                {event.startLocation}<br />
                {event.rwgpsUrl && (<Link href={event.rwgpsUrl}>{`View ${event.route} route`}</Link>)}
              </li>
            ))}
          </ul>
          <footer className={styles.eventFooter}>
            <LinkButton to='/registration/' primary small block>Register to ride</LinkButton>
          </footer>
        </ContentChild>
      </ContentWrapper>

      <ContentWrapper>
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

      <ContentWrapper>
        <h2>Recent member reports</h2>
        <ContentWrapper container>
          {posts.map((post, i) => (
            <ContentChild>
              <PostTeaser post={post} key={i}/>
            </ContentChild>))}
        </ContentWrapper>
      </ContentWrapper>
    </Layout >
  )
}

export default IndexPage
