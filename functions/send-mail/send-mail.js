const send = require('./send')

const handler = async (event) => {
  const { path, httpMethod } = event

  switch (`${path}:${httpMethod}`) {
    case '/.netlify/functions/send-mail/send:POST':
      return send(event)
    default: 
      return {
        statusCode: 404
      }
  }
}

module.exports = { handler }
