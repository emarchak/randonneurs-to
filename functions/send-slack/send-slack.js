require('cross-fetch');
const channels = require('./channels');

const handler = async (event) => {
  try {
    const channel = channels[event.queryStringParameters.channel || 'default']
    const channelEndpoint = process.env[channel]

    const response = await fetch(
      channelEndpoint,
      {
        method: 'POST',
        body: event.body,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return {
      statusCode: response.status,
      body: response.statusText
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({error: error.message || error.toString()}),
    }
  }
}

module.exports = { handler }
