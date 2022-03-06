import { HandlerEvent, HandlerResponse } from '@netlify/functions'
import { fetchEvents, RemoteEvent, eventtypeKey, fetchQuery, RemoteRoute, buildRoute, RemoteQuery } from './utils'

type BuildEventRoutesArgs = {
  event: RemoteEvent
  newRoutes: RemoteRoute[]
  routes: Map<string, RemoteRoute>
}

const buildEventRoute = ({ newRoutes, event, routes }: BuildEventRoutesArgs) => {
  const existingRoute = newRoutes.find((route) => route.route_name === event.event_name)

  if (existingRoute) {
    event.event_route = existingRoute.route_id
    return undefined
  }

  return routes.get(event.event_name)
}

const events = async (event: HandlerEvent): Promise<HandlerResponse> => {
  try {
    const rawEvents = await fetchEvents()
    const routes = new Map<string, RemoteRoute>()

    // 1. Build the events and route map from RO
    const events = rawEvents.map((rawEvent) => {
      const event: RemoteEvent = {
        event_id: parseInt(rawEvent.Sched_Id),
        event_name: rawEvent.Route,
        event_date: new Date(rawEvent.Unixtime * 1000).toISOString(),
        event_eventtype: eventtypeKey(rawEvent.Event),
        event_schedule_id: rawEvent.Sched_Id,
      }
      routes.set(rawEvent.Route, buildRoute(rawEvent))

      return event
    })

    // TODO make 2+3+4 recursive
    // 2. Fetch the existing routes from the graphql endpoint
    const { data: { route: existingRoutes } }: RemoteQuery<{ route: RemoteRoute[] }> = await fetchQuery(`
          query findRoutes {
            route(where: {route_name: {_in: ${JSON.stringify([...routes.keys()])}}}) {
              route_id
              route_name
            }
          }
      `)

    // 3. Associate existing routes with events, and build new routes
    const newRoutes: RemoteRoute[] = events.map((event) => buildEventRoute({ newRoutes: existingRoutes, event, routes })).filter(Boolean)


    // 4. Insert the new routes and rebuild events
    if (newRoutes.length) {
      const { data: { insert_route: { returning: remoteRoutes } }, errors }: RemoteQuery<{ insert_route: { returning: RemoteRoute[] } }> = await fetchQuery(`
      mutation upsertEvents {
        insert_route (
          objects: ${JSON.stringify(newRoutes)}
        ) {
          returning {
            route_id
            route_name
          }
        }
      }`)


      const newerRoutes: RemoteRoute[] = events.map((event) => buildEventRoute({ newRoutes: remoteRoutes, event, routes })).filter(Boolean)
      if (errors || newerRoutes.length) {
        throw new Error(JSON.stringify(errors) || JSON.stringify(`routelength problem`))
      }
    }

    // 5. Insert the events
    const { data, errors }: RemoteQuery<{ insert_event: { returning: RemoteEvent[] } }> = await fetchQuery(`
      mutation upsertEvents {
        insert_event(
          objects: ${JSON.stringify(events)}
        ) {
          returning {
            event_id
            event_name
          }
        }
      }`)

    if (errors) {
      return {
        statusCode: 500,
        body: JSON.stringify(errors)
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventCount: events.length,
        response: data,
      }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
}

export default events
