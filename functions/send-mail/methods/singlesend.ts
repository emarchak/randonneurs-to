import { HandlerEvent, HandlerResponse } from '@netlify/functions'
import { getSingleSends, getSingleSend } from '../../../source/sendGrid/api'

export const getSendsByCategory = async (event: HandlerEvent): Promise<HandlerResponse> => {
  try {
    const { category = '' } = event.queryStringParameters

    const response = await getSingleSends()

    const singleSends = response.filter((singleSend) => (category ? singleSend.categories.includes(category) : true)
      && singleSend.status === 'triggered')

    const fullData = await Promise.all(singleSends.map(async ({ id }) => {
      const response = await getSingleSend(id)
      return response
    }))

    return {
      statusCode: 200,
      body: JSON.stringify(fullData),
    }

  }
  catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err) || ''
    }
  }
}
