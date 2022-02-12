import { HandlerEvent, HandlerResponse } from '@netlify/functions'
import { fetchQuery, fetchEvents, RemoteRoute, buildRoute } from './utils'

const routes = async (event: HandlerEvent): Promise<HandlerResponse> => {
  try {
    const events = await fetchEvents()

    const routes = new Map<string, RemoteRoute>()

    events.forEach((rawEvent) => {
      const existingRoute = routes.get(rawEvent.Route)
      routes.set(rawEvent.Route, {
        ...existingRoute,
        ...buildRoute(rawEvent)
      })
    })

    const responseData = await fetchQuery(`
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
      `)

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
