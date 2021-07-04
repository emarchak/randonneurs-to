const client = require('@sendgrid/mail')
client.setApiKey(process.env.SENDGRID_API_KEY)

const send = async (event) => {
  const {
    to,
    from = 'Randonneurs Ontario <no-reply@randonneurs.to>',
    replyTo = 'Randonneurs Ontario <no-reply@randonneurs.to>',
    subject,
    body = ' ',
    templateId = null,
    data = {}
  } = JSON.parse(event.body)

  const [response] = await client.send({
    to,
    subject,
    from,
    replyTo,
    text: body.replace(/(<([^>]+)>)/gi, ""),
    html: body,
    templateId: templateId || undefined,
    dynamic_template_data: data
  });

  return {
    statusCode: response.statusCode || 200,
    body: response.body || '',
  }
}

module.exports = send
