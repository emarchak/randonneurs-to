import { HandlerEvent, HandlerResponse } from '@netlify/functions'
import { fetchEvents, RemoteEvent, eventtypeKey, fetchQuery, RemoteRoute, buildRoute, RemoteQuery, headers } from './utils'

export const syncEvents = async (event: HandlerEvent): Promise<HandlerResponse> => {
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
      }
      routes.set(rawEvent.Route, buildRoute(rawEvent))

      return event
    })
    // 2. Upsert the routes
    const { data: { insert_route: { returning: remoteRoutes } } }: RemoteQuery<{ insert_route: { returning: RemoteRoute[] } }> = await fetchQuery(`
      mutation CreateRoutes {
        insert_route(objects: ${JSON.stringify(Array.from(routes.values()))},
        on_conflict: {constraint: route_route_name_route_active_key, update_columns: []}) {
          returning {
            route_id
            route_name
          }
        }
      }`)

    const eventsWithRoutes = events.map((event) => ({
      ...event,
      event_route: remoteRoutes.find((route) => route.route_name === event.event_name)?.route_id
    }))

    // 3. Insert the events
    const { data, errors }: RemoteQuery<{ insert_event: { returning: RemoteEvent[] } }> = await fetchQuery(`
      mutation CreateEvents {
        insert_event(
          objects: ${JSON.stringify(eventsWithRoutes)}
        ) {
          returning {
            event_id
            event_name
          }
        }
      }`)
    if (errors) {
      throw new Error(JSON.stringify(errors))
    }

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    return {
      headers,
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
}
