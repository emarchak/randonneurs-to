const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const handler = async (event) => {
  try {
    const {to, subject, body} = event.queryStringParameters
    const message = {
      to,
      subject,
      text: body.replace(/(<([^>]+)>)/gi, ""),
      html: body
    }
    await sgMail.send(message);

    return {
      statusCode: 200,
      body: JSON.stringify({ message }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.response ? error.response.body : '' }
  }
}

module.exports = { handler }
