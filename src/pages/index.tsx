import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { ContentChild, ContentWrapper } from "src/components/content-wrapper"
import { Gallery } from "src/components/Gallery"
import { getDateTimeLong } from "src/utils"
import { Layout } from "src/components/layout"
import { Link } from "src/components/Link"
import { LinkButton } from "src/components/Buttons"
import { PostTeaser } from "src/components/Blog"
import { SEO } from "src/components/seo"
import { useBlog } from "src/data/blog"
import { Chapter, useEvents } from "src/data/events"

import * as styles from "./styles/index.module.scss"
import { iframe } from "src/components/styles/iframe.module.scss"

const pageQuery = graphql`
  query indexPageQuery {
    allMail(limit: 3, sort: { sentAt: DESC }) {
      nodes {
        id
        name
        teaser
        subject
      }
    }
    allSitePage(limit: 3, filter: { context: { type: { eq: mail } } }) {
      nodes {
        path
        context {
          id
        }
      }
    }
    allFile(
      filter: {
        extension: { regex: "/(jpg|JPG|jpeg)/" }
        relativeDirectory: { eq: "gallery" }
      }
      limit: 6
      sort: { birthTime: DESC }
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
    allSitePage: { nodes: pages },
    allMail: { nodes: newsletters },
  } = useStaticQuery(pageQuery)
  const { brevets } = useEvents({ chapter: Chapter.Toronto, limit: 2 })
  const { posts } = useBlog({ limit: 2 })

  return (
    <Layout>
      <ContentWrapper container>
        <ContentChild>
          <h3>About us</h3>
          <p>
            The Toronto Randonneurs are a chapter of Randonneurs Ontario
            ultra-distance cycling club. We've been riding 200km+ events
            southern Ontario since 1982.
          </p>
          <p>
            <Link href="https://randonneursontario.ca/">
              Randonneurs Ontario
            </Link>{" "}
            is affiliated with the{" "}
            <Link href="https://www.audax-club-parisien.com/en">
              Audax Club Parisien
            </Link>
            , the parent organization governing the qualification of riders
            wishing to participate in the 1200K Paris - Brest - Paris Randonnee.
            The club is also affiliated with{" "}
            <Link href="https://www.audax-club-parisien.com/en/our-organizations/brm-world/">
              Les Randonneurs Mondiaux
            </Link>
            , which provides recognition for brevets other than Paris - Brest -
            Paris that are longer than 1000K.
          </p>
          <LinkButton
            small
            secondary
            block
            href="https://randonneursontario.ca/who/index.html"
          >
            Learn more about Randonneurs Ontario
          </LinkButton>
        </ContentChild>
        <ContentChild>
          <h3>Upcoming events</h3>
          <ul className={styles.eventWrapper}>
            {brevets.map((event) => (
              <li key={event.id} className={styles.eventRow}>
                <Link to={event.path}>
                  <strong>
                    {event.route} {event.distance}
                  </strong>
                </Link>
                <br />
                {getDateTimeLong(new Date(event.date))}
                <br />
                {event.startLocation}
              </li>
            ))}
          </ul>
          <footer className={styles.eventFooter}>
            <LinkButton href="https://register.randonneursontario.ca/registration/" primary small block>
              Register to ride
            </LinkButton>
          </footer>
        </ContentChild>
      </ContentWrapper>

      <ContentWrapper>
        <ContentChild>
          <Gallery />
        </ContentChild>
      </ContentWrapper>

      <ContentWrapper>
        <h2>Recent member reports</h2>
        <ContentWrapper container>
          {posts.map((post, i) => (
            <ContentChild key={i}>
              <PostTeaser post={post} />
            </ContentChild>
          ))}
        </ContentWrapper>
      </ContentWrapper>
      <ContentWrapper>
        <h2>2021 Virtual Symposium</h2>
        <ContentWrapper container>
          <ContentChild>
            <iframe
              className={iframe}
              title="2021 Symposium video recording"
              src="https://www.youtube.com/embed/1_QZSRRFpP4?start=203"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </ContentChild>
          <ContentChild>
            <p>
              On 16 February 2022 we held our second Virtual Symposium! A
              perfect way to get better acquainted with randonneuring and to
              help you pull through the winter to get to the season start.
            </p>
            <p>
              Topics included: Hardware: The right stuff for randonneuring;
              Software: Nutrition, night riding, and mental toughness;
              Categories of rides: Brevets, Devil's Week and the flèche; Grand
              Brevets: Granite Anvil and Paris-Brest-Paris; Randonneurs Ontario
              awards; A first-hand experience riding a 1,000km brevet; Moderated
              Q&A with the speakers
            </p>
            <p>
              <Link to="symposium/2021">
                {"View the full recording and slide deck >>"}
              </Link>
            </p>
          </ContentChild>
        </ContentWrapper>
      </ContentWrapper>

      <ContentWrapper>
        <h2>Newsletters</h2>
        <ContentWrapper container>
          {newsletters.map(({ name, subject, teaser, id }) => (
            <ContentChild key={id}>
              <h3>{name}</h3>
              <h4>{subject}</h4>
              <p>
                {teaser}...{" "}
                <Link to={pages.find((page) => page.context.id === id)?.path}>
                  {"continue reading >>"}
                </Link>
              </p>
            </ContentChild>
          ))}
        </ContentWrapper>
      </ContentWrapper>
    </Layout>
  )
}

export const Head = () => {
  const {
    allFile: { nodes: images },
  } = useStaticQuery(pageQuery)
  const seoImage = getImage(images[0])

  return (
    <SEO
      description="Part of Randonneurs Ontario, a long distance cycling club affiliated with the Audax Club Parisien"
      image={seoImage}
    />
  )
}

export default IndexPage
