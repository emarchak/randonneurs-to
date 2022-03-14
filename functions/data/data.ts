import { Handler } from '@netlify/functions'
import { syncEvents } from './methods/events'
import { createRide } from './methods/rides'

const ROOT = '/.netlify/functions/data/'

const handler: Handler = async (event) => {
    const { path, httpMethod } = event

    switch (`${path}:${httpMethod}`) {
        case `${ROOT}events:POST`:
            return syncEvents(event)
        case `${ROOT}ride:POST`:
            return createRide(event)
        default:
            return {
                statusCode: 404,
                body: 'Function not found'
            }
    }
}

export { handler }
