import { Handler } from '@netlify/functions'
import send from './methods/send'

const handler: Handler = async (event) => {
  const { path, httpMethod } = event

  switch (`${path}:${httpMethod}`) {
    case '/.netlify/functions/send-mail/send:POST':
      return send(event)
    default:
      return {
        statusCode: 404,
        body: 'Function not found'
      }
  }
}

export { handler }
