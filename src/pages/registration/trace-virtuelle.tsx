
import React from 'react'
import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'
import { ContentChild, ContentWrapper } from "src/components/content-wrapper"
import { Callout } from 'src/components/callout'
import { routes } from '.'
import { TabMenu } from 'src/components/tabmenu'
import { Link } from 'src/components/link'
import { graphql, PageProps, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { ContactForm } from 'src/components/ContactForm'

const imageQuery = graphql`
query {
    file(name: {glob: "TraceVirtuelle"}) {
        name
        childImageSharp {
          gatsbyImageData(width:500)
        }
      }
}
`

const TraceVirtuelle = ({path}: PageProps) => {
    const { file } = useStaticQuery(imageQuery)
    const image = getImage(file)
    return (
        <Layout>
            <SEO
                title='Trace Virtuelle'
                description='The Trace Virtuelle is a virtual ultra-endurance cycling event based off of the Trace Vélocio'
                image={image}
            />
            <ContentWrapper>
                <TabMenu tabs={routes} activeRoute={path} />
                <h1>Trace Virtuelle</h1>
            </ContentWrapper>
            <ContentWrapper container>
                <ContentChild>
                    <GatsbyImage
                        image={image}
                        alt="The Trace Virtuelle is a virtual ultra-endurance cycling event based off of the Trace Vélocio."
                    />
                </ContentChild>
                <ContentChild>
                    <p>The Trace Virtuelle is a virtual ultra-endurance cycling event based off of the <Link href="https://www.audax-club-parisien.com/en/our-organizations/trace-velocio-en/">Trace Vélocio</Link> and is not an ACP approved Trace.</p>
                    <p> The Trace Virtuelle has three main features:</p>
                    <ol>
                        <li>Building a strong team spirit by training and riding together.</li>
                        <li>Each team member must complete at least 24 hours of riding together.</li>
                        <li>Teams will complete the ride together by participating remotely on their own virtual cycling platform of choice.</li>
                    </ol>
                </ContentChild>
            </ContentWrapper>
            <ContentWrapper>
                <h2>The Rules</h2>
                <p>A team is 2-6 riders with one appointed Captain. This is not a relay event, each team member must ride the full duration.</p>
                <p>At least 2 team members must complete at least 24 hours of riding together for the Trace Virtuelle to be certified.</p>
                <p>The Trace begins at 00:00. It must finish no earlier than 08:00, and no later than 10:30 the following day. For example, a team may start at Sat 06:00 and finish Sun 09:30. </p>
                <p>Teams must plan at least 3 breaks of any duration. Additional planned or unplanned breaks may be taken during the attempt. Breaks do not count toward riding time.</p>
                <p>Each team designs their own Trace plan on their own virtual cycling platform of choice. The team captain must submit a proposal with the time schedule and virtual cycling platform to the local organizer. </p>
                <p>Teams must register at least 15 days before their attempt.</p>
                <p>It’s recommended to set up a video or audio call between the team members during the Trace to encourage strong team spirit.</p>

                <Callout alternative>
                    <h3>Caveat for virtual cycling platforms</h3>
                    <p>Teams can choose whatever virtual cycling platform they prefer to ride on, but the platform must be used by all team members. </p>
                    <p>Team members must record their rides and submit them for certification at the same time. A lost or unsubmitted recording would be considered a DNF by the team member.</p>
                </Callout>
            </ContentWrapper>
            <ContentWrapper>
                <h2>Certification requirements</h2>
                <p>For a Trace to be certified by Randonneurs Ontario, it is required that:</p>
                <ol>
                    <li>At least 2 team members have ridden at least 24 hours together.</li>
                    <li>Teams must complete their 24 hours of riding no earlier than 08:00, and no later than 10:30 the following day.</li>
                    <li>The team Captain must contact the local organizer by 10:30 on the date of completion with confirmation of the Trace and the recorded rides.</li>
                </ol>
                <h3>Suggested virtual cycling platforms</h3>
                <ul>
                    <li>TrainerRoad</li>
                    <li>Zwift</li>
                    <li>Sufferfest</li>
                    <li>RGT Cycling</li>
                    <li>Rouvy</li>
                </ul>
            </ContentWrapper>

            <ContactForm formName="trace-virtuelle" messageLabel="Trace plan">
                <p>If you're interested in organizing a Trace Virtuelle, please contact the Board using the form below to begin the registration process.</p>
            </ContactForm>
        </Layout>
    )
}

export default TraceVirtuelle
