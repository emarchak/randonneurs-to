import fetch from 'cross-fetch'
import { formEncode, buildCard } from './utils'

const cardEndpoint = 'https://www.randonneursontario.ca/brevetcard/cardtopdf.php'

export const handler = async (event) => {
  try {
    const riderNames = JSON.parse(event.queryStringParameters.names || '[]').filter(Boolean)
    const scheduleId = event.queryStringParameters.scheduleId
    const customStartTime = event.queryStringParameters.start || ''

    if (!scheduleId) {
      throw Error('Missing scheduleId')
    }

    if (!(riderNames instanceof Array)) {
      throw Error('Rider names must be a valid JSON array ["Bob", "Dave"]')
    }

    const body = await buildCard({ riderNames, scheduleId, customStartTime })

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
        'Content-Disposition': `filename=brevetcard-${scheduleId}.pdf`,
      },
      body: Buffer.from(memBuffer).toString('base64'),
      isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
