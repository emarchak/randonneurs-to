import { HandlerEvent, HandlerResponse } from '@netlify/functions'
import { fetchEvents, RemoteEvent, eventtypeKey, fetchQuery, RemoteRoute, buildRoute } from './utils'

const events = async (event: HandlerEvent): Promise<HandlerResponse> => {
  try {
    const rawEvents = await fetchEvents()
    const routes = new Map<string, RemoteRoute>()
    const newRoutes: RemoteRoute[] = []

    const events = rawEvents.map((rawEvent) => {
      const event: RemoteEvent = {
        event_name: rawEvent.Route,
        event_date: new Date(rawEvent.Unixtime * 1000).toISOString(),
        event_eventtype: eventtypeKey(rawEvent.Event),
        event_start_time: rawEvent.Stime,
        event_schedule_id: rawEvent.Sched_Id,
      }
      routes.set(rawEvent.Route, buildRoute(rawEvent))

      return event
    })
    const { data: { route: existingRoutes } } = await fetchQuery(`
          query findRoutes {
            route(where: {route_name: {_in: ${JSON.stringify([...routes.keys()])}}}) {
              route_id
              route_name
            }
          }
      `)

    events.forEach((event) => {
      const existingRoute = existingRoutes.find((route) => route.route_name === event.event_name)
      if (existingRoute) {
        event.event_route = existingRoute.route_id
      } else {
        newRoutes.push(routes.get(event.event_name)!)
      }
    })

    const { data, error } = await fetchQuery(`
          mutation upsertEvents {
            insert_route (
              objects: ${JSON.stringify(newRoutes)},
              on_conflict: {
                constraint: route_route_name_route_chapter_route_distance_key,
              }
            ) {
              returning {
                route_id
                route_name
              }
            }
          }
          insert_event(
            objects: ${JSON.stringify(events)},
            on_conflict: {
              constraint: event_event_schedule_id_key
              update_columns: [event_date, event_eventtype, event_name, event_route, event_start_time]}
          ) {
            returning {
              event_id
              event_name
            }
          }
        }
          }`)

    if (error) {
      throw new Error(JSON.stringify(error))
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        count: events.length,
        routes: [...events],
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
