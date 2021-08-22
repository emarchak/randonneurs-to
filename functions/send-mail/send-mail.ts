import { Handler } from '@netlify/functions'
import send from './methods/send'
import { getSendsByCategory } from './methods/singlesend'

const handler: Handler = async (event) => {
  const { path, httpMethod } = event

  switch (`${path}:${httpMethod}`) {
    case '/.netlify/functions/send-mail/send:POST':
      return send(event)
    case '/.netlify/functions/send-mail/singlesends:GET':
      return getSendsByCategory(event)
    default:
      return {
        statusCode: 404,
        body: 'Function not found'
      }
  }
}

export { handler }
