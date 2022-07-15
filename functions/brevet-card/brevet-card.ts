require('isomorphic-unfetch')
import { formEncode, buildCard } from './utils'

const cardEndpoint = 'https://www.randonneursontario.ca/brevetcard/cardtopdf.php'

export const handler = async (event) => {
  try {
    const riderNameParam = event.queryStringParameters.name || ''
    const riderNamesParam = event.queryStringParameters.names || ''
    const riderNames = [riderNameParam, ...JSON.parse(riderNamesParam)].filter(Boolean)

    const scheduleId = event.queryStringParameters.scheduleId
    const customStartTime = event.queryStringParameters.start || ''

    if (!scheduleId) {
      throw Error('Missing scheduleId')
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
        'Content-Disposition': `filename=brevetcard-${riderName}-${scheduleId}.pdf`,
      },
      body: Buffer.from(memBuffer).toString('base64'),
      isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
