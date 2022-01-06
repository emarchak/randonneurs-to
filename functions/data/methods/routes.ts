import { HandlerEvent, HandlerResponse } from '@netlify/functions'
import fetch from 'isomorphic-unfetch'
import { brevetDistance, chapterKey, dbUrl, endpoint, RawEvent, RemoteRoute } from './utils'

const routes = async (event: HandlerEvent): Promise<HandlerResponse> => {
  try {
    const response = await fetch(endpoint)
    const data = await response.json()

    if (data.status !== 'ok') {
      throw new Error(`randOnt response ${response.status}`)
    }

    const routes = new Map<string, RemoteRoute>()

    data.schedule.forEach((rawEvent: RawEvent) => {
      const existingRoute = routes.get(rawEvent.Route)
      routes.set(rawEvent.Route, {
        ...existingRoute,
        route_brevet_distance: brevetDistance(parseInt(rawEvent.Distance)),
        route_distance: parseInt(rawEvent.Distance),
        route_name: rawEvent.Route,
        route_start_location: rawEvent.StartLoc,
        route_cuesheet: rawEvent.RWGPS || undefined,
        route_chapter: chapterKey(rawEvent.Chapter),
      })
    })
    const query = `
    mutation upsertRoute {
      insert_route (
        objects: ${JSON.stringify([...routes.values()])},
        on_conflict: {
          constraint: route_route_name_route_chapter_route_distance_key,
          update_columns: [route_cuesheet, route_distance, route_brevet_distance, route_start_location]
        }
      ) {
        returning {
          route_id
          route_name
        }
      }
    }
    `.replace(/"([^"]+)":/g, '$1:')

    const dbResponse = await fetch(dbUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [process.env.GRAPHQL_SECRETKEY]: process.env.GRAPHQL_SECRET,

      },
      body: JSON.stringify({ query })
    })
    const responseData = await dbResponse.json()

    return {
      statusCode: responseData.errors ? 500 : 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(responseData),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
}

export default routes
