require('isomorphic-unfetch')
const {FormData} = require('formdata-node')

const cardEndpoint = 'https://www.randonneursontario.ca/brevetcard/cardtopdf.php'

const handler = async (event) => {
  try {
    const riderName = event.queryStringParameters.name || ''
    const startTime = event.queryStringParameters.startTime || new Date()

    const body = new FormData()
    body.set('distance',   '300')
    body.set('evname',     'Kissing Bridge 300')
    body.set('evstart',    'June 19 2021')
    body.set('maxhours',   '20')
    body.set('maxminutes', '00')
    body.set('emergetel',  'vp@randonneurs.to')
    body.set('riderlist', `[{"fname":"${riderName}"}]`);
    body.set('controllist', "[   \n        {\n          \"dist\":\"0.0 km\",\n          \"name\":\"Start\",\n          \"open\":\"O: Sat 04h59\",\n          \"close\":\"C: Sat 05h59\"\n        },\n      ]");

    const response = await fetch(cardEndpoint, {
      method: 'POST',
      body,
    })

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText }
    }
  
    const pdf = await response.text()

    console.log(response.headers)
    console.log( '\n-------')
    console.log( pdf.substring(0, 200))
    console.log( '\n-------')
    console.log( pdf.toString('base64').substring(0, 200))

    // return new Response(stream, { 
    //   headers: { 
    //     'Content-Type': pdf.type,
    //     'Content-Disposition': `filename=brevetcard-${riderName}-${startTime.toString()}.pdf`,
    //   } 
    // })


    return { 
      statusCode: response.status,
      headers: {
        'Content-Disposition': `filename=brevetcard-${riderName}-${startTime.toString()}.pdf`,
      },
      body: pdf.toString('base64'),
      isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
