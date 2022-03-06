import { HandlerEvent, HandlerResponse } from '@netlify/functions'
import { RemoteEvent, fetchQuery, RemoteQuery } from './utils'

export const getRides = async (event: HandlerEvent): Promise<HandlerResponse> => { }

export const createRide = async (event: HandlerEvent): Promise<HandlerResponse> => {
  try {
    const {
      event_id,
      hidden = false,
      startime,
      email,
      firstname,
      lastname,
      gender
    } = JSON.parse(event.body)

    const { data: { riders } }: RemoteQuery<{ riders: { rider_id: number }[] }> = await fetchQuery(`
      query FindRider {
        riders(where: {rider_firstname: {_eq: ${firstname}}, rider_lastname: {_eq: ${lastname}}}) {
          rider_id
        }
      }`)

    const { data, errors }: RemoteQuery<{ insert_event: { returning: RemoteEvent[] } }> = await fetchQuery(`
      mutation RegisterRider {
        insert_ride_one(object: ${JSON.stringify({
      ride_event: event_id,
      ride_rider: riders[0]?.rider_id,
      ride_hidden: hidden,
      ride_startime: startime
    })}, on_conflict: {constraint: ride_unique, update_columns: [ride_starttime, ride_hidden]}) {
          ride_id
        }
      insert_rider_one(object: ${JSON.stringify({
      rider_email: email,
      rider_firstname: firstname,
      rider_lastname: lastname,
      rider_gender: gender
    })}, on_conflict: {constraint: rider_unique, update_columns: [rider_email, rider_gender]}) {
        rider_id
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
