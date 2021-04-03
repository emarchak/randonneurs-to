import React from 'react'
import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'
import { ContentWrapper } from "src/components/content-wrapper"
import { Aside } from 'src/components/callout'
import { registrationRoutes } from '.'
import { TabMenu } from 'src/components/tabmenu'

const MemberRegistration = () => (
    <Layout>
        <SEO title='Become a member' />
        <ContentWrapper>
            <TabMenu tabs={registrationRoutes} />
            <h1>Become a member</h1><h2>of Randonneurs Ontario</h2>

            <p>For all sanctioned rides, we require riders to have Ontario Cycling Association (OCA) membership. If you're not an OCA member, you can purchase a membership during registration.</p>

            <h3>Individual Membership</h3>
            <h4><strong>$40.00 CDN</strong> + OCA Membership </h4>
            <p>Full members may register for all standard rides throughout the season at no additional cost, can vote at the Annual General Meeting, and are invited to the Annual Awards dinner.</p>
            <p><a href="https://ccnbikes.com/#!/events/randonneurs-ontario-membership-2021" target="_blank">Click here to join</a> </p>

            <h3>Family Membership</h3>
            <h4><strong>$40.00 CDN</strong> + OCA Membership <strong>per family member</strong>.</h4>
            <p>The Family Membership receives all of the benefits of individual memberships, and is for a family living at the same address.</p>
            <p><a href="https://ccnbikes.com/#!/events/randonneurs-ontario-membership-2021" target="_blank">Click here to join</a></p>

            <h3>Trial Member</h3>
            <h4><strong>FREE</strong> + OCA Membership</h4>
            <p>There is no charge for rider for their first event, no matter the distance. First time riders must have an OCA Membership through Randonneurs Ontario or another OCA affiliated club.</p>
            <p></p>
            <p><a href="https://ccnbikes.com/#!/events/randonneurs-ontario-membership-2021" target="_blank">Click here to join</a></p>

        </ContentWrapper>

    </Layout>
)


export default MemberRegistration
