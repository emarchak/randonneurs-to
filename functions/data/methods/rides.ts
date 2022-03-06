import { HandlerEvent, HandlerResponse } from '@netlify/functions'
import { RemoteEvent, fetchQuery, RemoteQuery } from './utils'

export const createRide = async (event: HandlerEvent): Promise<HandlerResponse> => {
  try {
    const {
      eventId,
      hidden = false,
      email,
      firstName,
      lastName,
      gender
    } = JSON.parse(event.body)

    const { data: { insert_rider_one: { rider_id: riderId } } }: RemoteQuery<{ insert_rider_one: { rider_id: number } }> = await fetchQuery(`
    mutation CreateRider {
      insert_rider_one(object: ${JSON.stringify({
      rider_email: email,
      rider_firstname: firstName,
      rider_lastname: lastName,
      rider_gender: gender
    })}, on_conflict: {constraint: rider_rider_firstname_rider_lastname_key, update_columns: [rider_email, rider_gender]}) {
          rider_id
      }
      }`)

    const { data, errors }: RemoteQuery<{ insert_event: { returning: RemoteEvent[] } }> = await fetchQuery(`
      mutation RegisterRider {
        insert_ride_one(object: ${JSON.stringify({
      ride_event: eventId,
      ride_rider: riderId,
      ride_hidden: hidden,
    })}, on_conflict: {constraint: ride_unique, update_columns: [ride_hidden]}) {
          ride_id
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
