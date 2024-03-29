import sgSend, { MailDataRequired } from '@sendgrid/mail'
import { HandlerEvent, HandlerResponse } from '@netlify/functions'

sgSend.setApiKey(process.env.SENDGRID_API_KEY)

const send = async (event: HandlerEvent): Promise<HandlerResponse> => {
  try {
    const {
      to,
      from = 'Randonneurs Ontario <no-reply@randonneurs.to>',
      replyTo = 'Randonneurs Ontario <no-reply@randonneurs.to>',
      subject,
      body = ' ',
      templateId = null,
      data = {}
    } = JSON.parse(event.body)

    const [response] = await sgSend.send({
      to,
      subject,
      from,
      replyTo,
      text: body.replace(/(<([^>]+)>)/gi, ""),
      html: body,
      templateId: templateId || undefined,
      dynamic_template_data: data
    } as MailDataRequired)

    return {
      statusCode: response.statusCode || 200,
      body: JSON.stringify(response.body),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
}

export default send
