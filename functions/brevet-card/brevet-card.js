require('isomorphic-unfetch');
const { formEncode, buildCard} = require('./utils')

const cardEndpoint = 'https://www.randonneursontario.ca/brevetcard/cardtopdf.php'

const handler = async (event) => {
  try {
    const riderName = event.queryStringParameters.name || ''
    const scheduleId = event.queryStringParameters.scheduleId || ''
    const startTime = event.queryStringParameters.startTime || ''

    const body = await buildCard({riderName, scheduleId, startTime})

    const response = await fetch(cardEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formEncode(body)
    })

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText }
    }
    
    const memBuffer = await response.arrayBuffer()

    return { 
      statusCode: response.status,
      headers: {
        'Content-Disposition': response.headers.get('content-disposition'),
      },
      body: Buffer.from(memBuffer).toString('base64'),
      isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
