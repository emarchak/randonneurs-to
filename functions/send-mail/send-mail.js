const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const handler = async (event) => {
  try {
    const {
      to,
      from = 'no-reply@randonneurs.to',
      replyTo = 'no-reply@randonneurs.to',
      subject,
      body,
      templateId = null,
      data = {}
    } = JSON.parse(event.body)

    const [response] = await sgMail.send({
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
  } catch (error) {
    return {
      statusCode: 500,
      body: error.response ? JSON.stringify(error.response.body) : ''
    }
  }
}

module.exports = { handler }
