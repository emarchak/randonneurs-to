import fetch from 'isomorphic-unfetch'
const apiKey = process.env.SENDGRID_API_KEY

const baseUrl = 'https://api.sendgrid.com/v3'
const endpoints = {
  singleSends: () => `${baseUrl}/marketing/singlesends`,
  singleSend: (id: string) => `${baseUrl}/marketing/singlesends/${id}`,
}

const headers = {
  'content-type': 'application/json',
  'Authorization': `Bearer ${apiKey}`,
}

type SingleSend = {
  id: string
  name: string
  status: 'triggered' | 'draft'
  categories: string[]
  send_at: string
}

type SingleSendFull = SingleSend &{
  email_config: {
    subject: string
    html_content: string
  }
  send_to: {
    list_ids: string[]
  }
}

export const getSingleSends = async (): Promise<SingleSend[]> => {
  const response = await fetch(endpoints.singleSends(), {headers})
  const data = await response.json()
  return data.result
}

export const getSingleSend = async (id:string): Promise<SingleSendFull> => {
  const response = await fetch(endpoints.singleSend(id), {headers})
  return await response.json()
}
