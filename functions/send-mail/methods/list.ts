import fetch from 'isomorphic-unfetch'
import { HandlerEvent, HandlerResponse } from "@netlify/functions"

const listsEndpoint = 'https://api.sendgrid.com/v3/marketing/lists'
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
}

type ContactList = {
  name: string,
  id: string,
  contact_count: number,
}

const getLists = async (event: HandlerEvent): Promise<HandlerResponse> => {
  try {
    const response = await fetch(listsEndpoint, {
      method: 'GET',
      headers
    })
    const data = await response.json()

    return {
      statusCode: response.status,
      body: JSON.stringify(data?.result)
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
    const { scheduleId } = JSON.parse(event.body)
    const { statusCode, body } = await getLists(event)

    const lists = JSON.parse(body)

    lists.find(({ name, id }) => { })

    return {
      statusCode: statusCode,
      body: JSON.stringify(lists)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error?.message)
    }
  }
}

export default getLists
