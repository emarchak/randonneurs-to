import React from 'react'
import { PageProps } from 'gatsby'
import { ContentChild, ContentWrapper } from "src/components/content-wrapper"
import { Layout } from 'src/components/layout'
import { Link } from 'src/components/link'
import { LinkButton } from 'src/components/Buttons'
import { SEO } from 'src/components/seo'
import { TabMenu } from 'src/components/Menu'

const MemberRegistration = ({path}: PageProps) => {
    return (
        < Layout >
            <SEO title='Become a member of Randonneurs Ontario' />
            <ContentWrapper>
                <TabMenu section='registration' activeRoute={path} />
                <h1>Become a member</h1><h2>of Randonneurs Ontario</h2>

                <p>For all sanctioned rides, we require riders to have Ontario Cycling Association (OCA) membership. If you're not an OCA member, you can purchase a membership during registration.</p>

                <p><Link href="http://randonneursontario.ca">Learn more about being a member of Randonneurs Ontario</Link>.</p>
            </ContentWrapper>

            <ContentWrapper container>
                <ContentChild>
                    <h3>Trial Member</h3>
                    <h4><strong>FREE</strong> + OCA Membership</h4>
                    <p><small>There is no charge for rider for their first event, no matter the distance. First time riders must have an OCA Membership through Randonneurs Ontario or another OCA affiliated club.</small></p>
                    <LinkButton href="https://ccnbikes.com/#!/events/randonneurs-ontario-membership-2021" secondary small block>Join as a trial</LinkButton>
                </ContentChild>
                <ContentChild>
                    <h3>Individual Membership</h3>
                    <h4><strong>$40.00 CDN</strong> + OCA Membership </h4>
                    <p><small>Full members may register for all standard rides throughout the season at no additional cost, can vote at the Annual General Meeting, and are invited to the Annual Awards dinner.</small></p>
                    <LinkButton href="https://ccnbikes.com/#!/events/randonneurs-ontario-membership-2021" primary small block>Join as an individual</LinkButton>
                </ContentChild>
                <ContentChild>
                    <h3>Family Membership</h3>
                    <h4><strong>$40.00 CDN</strong> + OCA Membership <strong>per family member</strong></h4>
                    <p><small>The Family Membership receives all of the benefits of individual memberships, and is for a family living at the same address.</small></p>
                    <LinkButton href="https://ccnbikes.com/#!/events/randonneurs-ontario-membership-2021" secondary small block>Join as a family</LinkButton>
                </ContentChild>
            </ContentWrapper>
        </Layout >
    )
}


export default MemberRegistration
