require('isomorphic-unfetch');

const handler = async (event) => {
  try {
    const {headers, httpMethod, body} = event
    const response = await fetch(process.env.GRAPHQL_URL, {
      method: httpMethod,
      headers: {
          "content-type": headers["content-type"],
          "apollographql-client-name": headers["apollographql-client-name"],
          [`${process.env.GRAPHQL_SECRETKEY}`]: process.env.GRAPHQL_SECRET,
      },
      body
    })

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    }
  } catch (error) {
    
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

module.exports = { handler }
