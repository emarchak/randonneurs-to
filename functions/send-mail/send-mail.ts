import { Handler } from '@netlify/functions'
import addContact from './methods/addContact'
import send from './methods/send'
import lists, { getListByScheduleId } from './methods/lists'

const handler: Handler = async (event) => {
  const { path, httpMethod } = event

  switch (`${path}:${httpMethod}`) {
    case '/.netlify/functions/send-mail/send:POST':
      return send(event)
    case '/.netlify/functions/send-mail/contact:PUT':
      return addContact(event)
    case '/.netlify/functions/send-mail/lists:GET':
      return lists(event)
    case '/.netlify/functions/send-mail/list:GET':
      return getListByScheduleId(event)
    default:
      return {
        statusCode: 404,
        body: 'Function not found'
      }
  }
}

export { handler }
