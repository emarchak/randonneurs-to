const send = require('./send')
const addContact = require('./addContact')

const handler = async (event) => {
  const { path, httpMethod } = event
  try {
    switch (`${path}:${httpMethod}`) {
      case '/.netlify/functions/send-mail/send:POST':
        return send(event)
      case '/.netlify/functions/send-mail/contact:PUT':
        return addContact(event)
    default: 
      return {
        statusCode: 404
      }
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: error.response ? JSON.stringify(error.response.body) : ''
    }
  }
}

module.exports = { handler }
