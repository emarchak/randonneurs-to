import { Handler } from '@netlify/functions'
import addContact from './methods/addContact'
import send from './methods/send'

const handler: Handler = async (event) => {
  const { path, httpMethod } = event

  switch (`${path}:${httpMethod}`) {
    case '/.netlify/functions/send-mail/send:POST':
      return send(event)
    case '/.netlify/functions/send-mail/contact:PUT':
      return addContact(event)
    default:
      return {
        statusCode: 404,
        body: 'Function not found'
      }
  }
}

export { handler }
