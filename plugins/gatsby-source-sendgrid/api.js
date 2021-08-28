const fetch = require('isomorphic-unfetch')

const apiKey = process.env.SENDGRID_API_KEY

const baseUrl = 'https://api.sendgrid.com/v3'
const endpoints = {
  singleSends: () => `${baseUrl}/marketing/singlesends`,
  singleSend: (id) => `${baseUrl}/marketing/singlesends/${id}`,
}

const headers = {
  'content-type': 'application/json',
  'Authorization': `Bearer ${apiKey}`,
}

const getSingleSends = async () => {
  const response = await fetch(endpoints.singleSends(), {headers})
  const data = await response.json()
  return data.result
}

const getSingleSend = async (id) => {
  const response = await fetch(endpoints.singleSend(id), {headers})
  return await response.json()
}

module.exports = {
  getSingleSends,
  getSingleSend
}
