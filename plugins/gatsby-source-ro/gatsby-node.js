/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
const fetch = require('isomorphic-unfetch')

const EVENT_NODE_TYPE = 'event'
const RO_ENDPOINT = 'https://www.randonneursontario.ca/brevetcard/schedule.php'

const lowercaseKeys = (o) => Object.keys(o).reduce((c, k) => (c[k.toLowerCase()] = o[k], c), {})
const hotFix2021RougeRamble = (event) => ({ ...event, Unixtime: event.Unixtime === 1615734000 ? 1615730400 : event.Unixtime })

const rwgpsRegex = /^((?:https?:)?\/\/)?((?:www)\.)?((?:ridewithgps\.com))(\/routes\/)([\d\-]+)?$/

exports.sourceNodes = async ({
    actions,
    createContentDigest,
    createNodeId,
}) => {
    const { createNode } = actions

    try {
        const response = await fetch(RO_ENDPOINT)
        const data = await response.json()

        if (data.status !== 'ok') {
            throw new Error(`gatsby-source-ro response ${response.status} ${response.message}`)
        }

        data.schedule.map(hotFix2021RougeRamble).map(lowercaseKeys).forEach((rawEvent) => {
            const eventDate = new Date(rawEvent.unixtime * 1000)
            const rwgps = rawEvent.rwgps.match(rwgpsRegex) || [''];
            const event = {
                ...rawEvent,
                distance: parseInt(rawEvent.distance),
                rwgpsUrl: rawEvent.rwgps,
                rwgpsId: rwgps.pop(),
                startLocation: rawEvent.startloc,
                date: eventDate.toISOString(),
                season: eventDate.getFullYear()
            }

            createNode({
                ...event,
                id: createNodeId(`${EVENT_NODE_TYPE}-${event.sched_id}`),
                internal: {
                    type: EVENT_NODE_TYPE,
                    content: JSON.stringify(event),
                    contentDigest: createContentDigest(event),
                },
            })
        })
    } catch (error) {
        console.error(error)
    }
}

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions

    const eventTypes = `
        enum Chapter {
            Toronto
            Huron
            Ottawa
            Simcoe
        }
        enum RideType {
            brevet
            permanent
            fleche
            populaire
        }
        type Event implements Node {
            rwgpsId: Int
            chapter: Chapter
            event: RideType
        }
    `
    createTypes(eventTypes)
}