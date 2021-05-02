import React from 'react'
import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'
import { ContentChild, ContentWrapper } from "src/components/content-wrapper"
import { registrationRoutes } from '.'
import { TabMenu } from 'src/components/tabmenu'
import { LinkButton } from 'src/components/form/buttons'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { galleryTile, gallery } from '../styles/index.module.scss'

const pageQuery = graphql`
query {
  allFile(
    filter: {extension: {regex: "/(jpg|JPG|jpeg)/"}, relativeDirectory: {eq: "gallery"}}
    limit: 9
  ) {
    nodes {
      name
      childImageSharp {
        gatsbyImageData(aspectRatio: 1, height: 100, formats: JPG)
      }
    }
  }
}
`

const MemberRegistration = () => {
    const {
        allFile: { nodes: images },
    } = useStaticQuery(pageQuery)

    const gallery1 = images.slice(0, 3)
    const gallery2 = images.slice(2, 5)
    const gallery3 = images.slice(5, 8)

    return (
        < Layout >
            <SEO title='Become a member of Randonneurs Ontario' />
            <ContentWrapper>
                <TabMenu activeRoute={'/registration/membership/'} tabs={registrationRoutes} />
                <h1>Become a member</h1><h2>of Randonneurs Ontario</h2>

                <p>For all sanctioned rides, we require riders to have Ontario Cycling Association (OCA) membership. If you're not an OCA member, you can purchase a membership during registration.</p>
            </ContentWrapper>

            <ContentWrapper container>
                <ContentChild>
                    <h3>Trial Member</h3>

                    <h4><strong>FREE</strong> + OCA Membership</h4>
                    <p><small>There is no charge for rider for their first event, no matter the distance. First time riders must have an OCA Membership through Randonneurs Ontario or another OCA affiliated club.</small></p>

                    <div className={gallery}>
                        {gallery1.map(image => (
                            <GatsbyImage
                                className={galleryTile}
                                key={image.name}
                                image={image.childImageSharp.gatsbyImageData}
                                alt={image.name}
                            />))}
                    </div>
                    <LinkButton href="https://ccnbikes.com/#!/events/randonneurs-ontario-membership-2021" secondary small block>Join as a trial</LinkButton>
                </ContentChild>
                <ContentChild>
                    <h3>Individual Membership</h3>

                    <h4><strong>$40.00 CDN</strong> + OCA Membership </h4>
                    <p><small>Full members may register for all standard rides throughout the season at no additional cost, can vote at the Annual General Meeting, and are invited to the Annual Awards dinner.</small></p>
                    <div className={gallery}>
                        {gallery2.map(image => (
                            <GatsbyImage
                                className={galleryTile}
                                key={image.name}
                                image={image.childImageSharp.gatsbyImageData}
                                alt={image.name}
                            />))}
                    </div>

                    <LinkButton href="https://ccnbikes.com/#!/events/randonneurs-ontario-membership-2021" primary small block>Join as an individual</LinkButton>

                </ContentChild>
                <ContentChild>
                    <h3>Family Membership</h3>
                    <h4><strong>$40.00 CDN</strong> + OCA Membership <strong>per family member</strong></h4>
                    <p><small>The Family Membership receives all of the benefits of individual memberships, and is for a family living at the same address.</small></p>
                    <div className={gallery}>
                        {gallery3.map(image => (
                            <GatsbyImage
                                className={galleryTile}
                                key={image.name}
                                image={image.childImageSharp.gatsbyImageData}
                                alt={image.name}
                            />))}
                    </div>
                    <LinkButton href="https://ccnbikes.com/#!/events/randonneurs-ontario-membership-2021" secondary small block>Join as a family</LinkButton>
                </ContentChild>
            </ContentWrapper>
        </Layout >
    )
}


export default MemberRegistration
