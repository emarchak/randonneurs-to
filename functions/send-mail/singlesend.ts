import sgMail from '@sendgrid/mail'
import { HandlerEvent, HandlerResponse } from '@netlify/functions'

const getSingleSend = async (event: HandlerEvent): Promise<HandlerResponse> => {
  console.log(event)
  return {
      statusCode: 200,
      body: ''
  }
}

export default {
  get: getSingleSend
}
