const send = require('./send')
const singlesend = require('./singlesend')

const handler = async (event) => {
  const { path, httpMethod } = event

  switch (`${path}:${httpMethod}`) {
    case '/.netlify/functions/send-mail/send:POST':
      return send(event)
      case '/.netlify/functions/send-mail/singlesend:GET':
        return singlesend.get(event)
    default:
      return {
        statusCode: 404
      }
  }
}

module.exports = { handler }
