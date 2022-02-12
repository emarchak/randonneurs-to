import { Handler } from '@netlify/functions'
import routes from './methods/routes'
import events from './methods/events'

const ROOT = '/.netlify/functions/data/'

const handler: Handler = async (event) => {
    const { path, httpMethod } = event

    switch (`${path}:${httpMethod}`) {
        case `${ROOT}routes:POST`:
            return routes(event)
        case `${ROOT}events:POST`:
            return events(event)
        default:
            return {
                statusCode: 404,
                body: 'Function not found'
            }
    }
}

export { handler }
