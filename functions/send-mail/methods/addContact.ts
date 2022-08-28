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
      first_name,
      last_name,
      email,
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
        throw new Error(`Could not find field definition for ${fieldName}`)
      }
      contactCustomFields[definition.id] = customFields[fieldName]
    })

    const response = await fetch(contactEndpoint, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        contacts: [{
          first_name,
          last_name,
          email,
          custom_fields: contactCustomFields
        }],
      })
    })

    return {
      statusCode: response.status,
      body: response.statusText
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error?.message)
    }
  }
}

export default addContact
