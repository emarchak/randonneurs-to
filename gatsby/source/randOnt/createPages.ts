import { GatsbyNode } from "gatsby"
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { EventCalendarFeedsQuery } from 'src/gatsby.gql'
import { createEvents, EventAttributes } from 'ics'
import { getDateTimeLong } from '../../../src/utils'

const eventPath = './public/event'
const brevetTimeLimits = {
  default: { hours: 6, minutes: 0 },
  200: { hours: 13, minutes: 30 },
  300: { hours: 20, minutes: 0 },
  400: { hours: 27, minutes: 0 },
  600: { hours: 40, minutes: 0 },
  1000: { hours: 75, minutes: 0 },
  1200: { hours: 90, minutes: 0 },
  1400: { hours: 116, minutes: 40 },
  2200: { hours: 220, minutes: 0 }
}

const getBrevetTimeLimit = (distance: number): typeof brevetTimeLimits.default => Boolean(brevetTimeLimits[distance]) ? brevetTimeLimits[distance] : brevetTimeLimits['default']

const buildCalendarDescription = (event: EventCalendarFeedsQuery['allEvent']['nodes'][0]) =>
(`${event.route} - ${event.distance}km
  Start location: ${event.startLocation}
  Start time: ${getDateTimeLong(new Date(event.date))}
  Brevet time limit: ${getBrevetTimeLimit(event.distance).hours} hours, ${getBrevetTimeLimit(event.distance).minutes} minutes
  Chapter: ${event.chapter}\n\
  Visit https://randoneurs.to${event.path} for more information.
`)

export const createPages: GatsbyNode['createPages'] = async ({ graphql }) => {
  const seasons = new Map<string, EventAttributes[]>()
  const { data } = await graphql<EventCalendarFeedsQuery>(`
    query EventCalendarFeeds {
      allEvent(sort: {date: ASC}) {
        nodes {
          chapter
          distance
          eventType
          id
          organizer
          route
          startLocation
          date
          season
          path: gatsbyPath(filePath: "/event/{event.season}/{event.route}-{event.date}")
        }
      }
    }`)

  if (!data) {
    return
  }

  if (!existsSync(eventPath)) {
    mkdirSync(eventPath, { recursive: true })
  }

  data.allEvent.nodes.forEach((event) => {
    const date = new Date(event.date)
    seasons.set(event.season, [...(seasons.get(event.season) || []), {
      start: [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes()],
      title: `${event.route} ${event.distance}km ${event.eventType}`,
      description: buildCalendarDescription(event),
      location: event.startLocation,
      url: `https://randoneurs.to${event.path}`,
      duration: getBrevetTimeLimit(event.distance),
    }])
  })
  seasons.forEach((events, season) =>
    writeFileSync(`${eventPath}/${season}.ics`, createEvents(events).value)
  )
}
