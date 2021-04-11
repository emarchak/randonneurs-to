const process = require('process')
const { promisify } = require('util')

const sendMailLib = require('sendmail')

const { validateEmail, validateLength } = require('./validations')

const sendMail = promisify(sendMailLib())

const NAME_MIN_LENGTH = 3
const NAME_MAX_LENGTH = 50
const DETAILS_MIN_LENGTH = 10
const DETAILS_MAX_LENGTH = 1e3

const handler = async (event) => {
  if (!process.env.SERVICE_EMAIL) {
    return {
      statusCode: 500,
      body: 'process.env.SERVICE_EMAIL must be defined',
    }
  }

  const body = JSON.parse(event.body)

  try {
    validateLength('body.name', body.name, NAME_MIN_LENGTH, NAME_MAX_LENGTH)
  } catch (error) {
    return {
      statusCode: 403,
      body: error.message,
    }
  }

  try {
    validateEmail('body.to', body.to)
  } catch (error) {
    return {
      statusCode: 403,
      body: error.message,
    }
  }

  try {
    validateLength('body.details', body.details, DETAILS_MIN_LENGTH, DETAILS_MAX_LENGTH)
  } catch (error) {
    return {
      statusCode: 403,
      body: error.message,
    }
  }

  const descriptor = {
    from: `"${process.env.SERVICE_EMAIL}" <${process.env.SERVICE_EMAIL}>`,
    to: body.to,
    subject: body.subject,
    html: body.details,
  }

  try {
    await sendMail(descriptor)
    return { statusCode: 200, body: '' }
  } catch (error) {
    return { statusCode: 500, body: error.message }
  }
}

module.exports = { handler }
