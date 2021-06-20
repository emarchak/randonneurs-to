const cardEndpoint = 'https://www.randonneursontario.ca/brevetcard/cardtopdf.php'

const formEncode = data => Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(
        typeof data[key] === 'string' ? data[key] : JSON.stringify(data[key])
          ))
      .join("&")

const handler = async (event) => {
  try {
    const riderName = event.queryStringParameters.name || ''
    const startTime = event.queryStringParameters.startTime || new Date()

    const body = {
      distance:    "300",
      evname:      "Kissing Bridge 300",
      evstart:     "June 19 2021",
      maxhours:    "20",
      maxminutes:  "00",
      emergetel:   "vp@randonneurs.to",
      riderlist:   [{fname: riderName}],
      controllist: [    
        {       
          dist: "0.0 km",
          name: "Start",
          open: "O: Sat 04h59",
          close: "C: Sat 05h59"    
        },
      ],
    }

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
