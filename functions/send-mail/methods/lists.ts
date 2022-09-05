import fetch from 'isomorphic-unfetch'
import { HandlerEvent, HandlerResponse } from "@netlify/functions"

const getListsEndpoint = 'https://api.sendgrid.com/v3/marketing/lists'
const createListsEndpoint = 'https://api.sendgrid.com/v3/marketing/lists'
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
}

type RemoteContactList = {
  name: string,
  id: string,
  contact_count: number,
  _metadata: {
    self: string
  }
}
type ContactList = {
  name: string,
  id: string,
  scheduleId?: string,
  contactCount: number
  url: string
}

const getLists = async (event: HandlerEvent): Promise<HandlerResponse> => {
  try {
    const response = await fetch(getListsEndpoint, {
      method: 'GET',
      headers
    })

    const data = await response.json()
    const lists: ContactList[] = data?.result?.map(({ name, id, contact_count, _metadata }: RemoteContactList) => ({
      name,
      id,
      scheduleId: name.match(/^\d{3,}/)?.pop(),
      contactCount: contact_count,
      url: _metadata.self
    }))
    return {
      statusCode: response.status,
      body: JSON.stringify(lists)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error?.message)
    }
  }
}

export const getListByScheduleId = async (event: HandlerEvent): Promise<HandlerResponse> => {
  try {
    const scheduleId = event.queryStringParameters.scheduleId
    const { statusCode, body } = await getLists(event)

    const lists: ContactList[] = JSON.parse(body)
    const list = lists.find(list => (list.scheduleId === scheduleId))

    return {
      statusCode: statusCode,
      body: JSON.stringify(list || {})
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error?.message)
    }
  }
}

export const addList = async (event: HandlerEvent): Promise<HandlerResponse> => {
  try {
    const { name } = JSON.parse(event.body)

    const response = await fetch(createListsEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name
      })
    })
    return {
      statusCode: response.status,
      body: JSON.stringify(response)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error?.message)
    }
  }
}

export default getLists
