require('isomorphic-unfetch')
const {FormData} = require('formdata-node')

const cardEndpoint = 'https://www.randonneursontario.ca/brevetcard/cardtopdf.php'

const handler = async (event) => {
  try {
    const riderName = event.queryStringParameters.name || ''
    const startTime = event.queryStringParameters.startTime || new Date()

    const body = new FormData()
    body.set('distance',    '300')
    body.set('evname',      'Kissing Bridge 300')
    body.set('evstart',     'June 19 2021')
    body.set('maxhours',    '20')
    body.set('maxminutes',  '00')
    body.set('emergetel',   'vp@randonneurs.to')
    body.set('riderlist',   `[{"fname":"${riderName}"}]`);
    body.set('controllist', `[{  "dist":"0.0 km",  "name":"Start",  "open":"O: Sat 04h59",  "close":"C: Sat 05h59"}]`);

    const response = await fetch(cardEndpoint, {
      method: 'POST',
      body,
    })

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText }
    }
    
    const memBuffer = await response.arrayBuffer()

    return { 
      statusCode: response.status,
      headers: {
        'Content-Disposition': `filename=brevetcard-${riderName}-${startTime.toString()}.pdf`,
      },
      body: Buffer.from(memBuffer).toString('base64'),
      isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
