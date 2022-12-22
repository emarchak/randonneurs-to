import fetch from 'cross-fetch'
import channels from './channels'

const handler = async (event) => {
  try {
    const channel = channels[event.queryStringParameters.channel || 'default']
    const channelEndpoint = process.env[channel]
    console.log({ channel, channelEndpoint, body: event.body })
    const response = await fetch(
      channelEndpoint,
      {
        method: 'POST',
        body: event.body,
        headers: {
          'Content-type': 'application/json',
        },
      },
    )
    console.log({ response })
    return {
      statusCode: response.status,
      body: response.statusText
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || error.toString() }),
    }
  }
}

module.exports = { handler }
