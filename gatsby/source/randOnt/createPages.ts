import { GatsbyNode } from "gatsby"
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { EventCalendarFeedsQuery } from "src/gatsby.gql"

const eventPath = './public/event'

export const createPages: GatsbyNode['createPages'] = async ({ graphql, ...args }) => {
  console.log('hello')
  const { data } = await graphql<EventCalendarFeedsQuery>(`
    query EventCalendarFeeds {
      allEvent {
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
    mkdirSync(eventPath)
  }

  data.allEvent.nodes.map(event => {
    const data = { ...event }
    writeFileSync(`${eventPath}/${data.id}.json`, JSON.stringify(data))
  })
  console.log('Found something!')
}
