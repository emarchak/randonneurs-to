import fetch from 'isomorphic-unfetch'
import { HandlerEvent, HandlerResponse } from "@netlify/functions"

const contactEndpoint = 'https://api.sendgrid.com/v3/marketing/contacts'
const customFieldEndpoint = 'https://api.sendgrid.com/v3/marketing/field_definitions'

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
}

const addContact = async (event: HandlerEvent): Promise<HandlerResponse> => {
  try {
    const {
      email,
      name,
      customFields = {},
    } = JSON.parse(event.body)

    if (!email) {
      throw new Error('Email is required')
    }

    const customFieldResponse = await fetch(customFieldEndpoint, { headers })
    const { custom_fields: fieldDefinitions } = await customFieldResponse.json()

    const contactCustomFields = {}
    Object.keys(customFields).forEach((fieldName) => {
      const definition = fieldDefinitions.find((definition) => fieldName === definition.name)
      if (!definition) {
        throw new Error(`Could not find field defitiion for ${fieldName}`)
      }
      contactCustomFields[definition.id] = customFields[fieldName]
    })

    const response = await fetch(contactEndpoint, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        contacts: [{
          first_name: name.substring(0, name.indexOf(' ')),
          last_name: name.substring(name.indexOf(' ') + 1),
          email,
          custom_fields: contactCustomFields
        }],
      })
    })
    if (!(response.statusText === 'OK')) {
      throw new Error(response.statusText)
    }

    const data = await response.json()

    return {
      statusCode: response.status,
      body: JSON.stringify(data)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: error.response ? JSON.stringify(error.response.body) : ''
    }
  }
}

export default addContact
