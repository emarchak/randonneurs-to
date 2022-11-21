import { GatsbyNode } from 'gatsby'
import fetch from 'cross-fetch'
import { nodeType } from '.'

const endpoint = process.env.RO_ENDPOINT

const lowercaseKeys = (o) => Object.keys(o).reduce((c, k) => (c[k.toLowerCase()] = o[k], c), {})

const rwgpsRegex = /^((?:https?:)?\/\/)?((?:www)\.)?((?:ridewithgps\.com))(\/routes\/)([\d\-]+)?$/

export const getSeason = (event: Date): String => event.getFullYear().toString()

export const eventTypes = (test: string) => ['Brevet', 'Permanent', 'Fleche', 'Populaire'].find(eventType => eventType === test) || 'Other'
export const chapters = (test: string) => ['Club', 'Toronto', 'Huron', 'Ottawa', 'Simcoe'].find(chapter => test.includes(chapter)) || 'Other'

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({
    actions,
    createContentDigest,
    createNodeId,
}) => {
    const { createNode } = actions

    try {
        const response = await fetch(endpoint)
        const data = await response.json()

        if (data.status !== 'ok') {
            throw new Error(`randOnt response ${response.status}`)
        }

        data.schedule.map(lowercaseKeys).forEach((rawEvent) => {
            const eventDate = new Date(rawEvent.unixtime * 1000)
            const rwgps = rawEvent.rwgps.match(rwgpsRegex) || ['']
            const event = {
                ...rawEvent,
                distance: parseInt(rawEvent.distance),
                rwgpsUrl: rawEvent.rwgps,
                rwgpsId: rwgps.pop(),
                startLocation: rawEvent.startloc.replaceAll(/<[^>]*>/g, ''),
                date: eventDate.toISOString(),
                season: getSeason(eventDate),
                scheduleId: rawEvent.sched_id,
                chapter: chapters(rawEvent.chapter),
                eventType: eventTypes(rawEvent.event)
            }

            createNode({
                ...event,
                id: createNodeId(`${nodeType}-${event.scheduleId}`),
                internal: {
                    type: nodeType,
                    content: JSON.stringify(event),
                    contentDigest: createContentDigest(event),
                },
            })
        })
    } catch (error) {
        throw new Error(error)
    }
}
