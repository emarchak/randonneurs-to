import { Handler } from '@netlify/functions'
import routes from './methods/routes'

const ROOT = '/.netlify/functions/data/'

const handler: Handler = async (event) => {
    const { path, httpMethod } = event

    switch (`${path}:${httpMethod}`) {
        case `${ROOT}routes:POST`:
            return routes(event)
        default:
            return {
                statusCode: 404,
                body: 'Function not found'
            }
    }
}

export { handler }
