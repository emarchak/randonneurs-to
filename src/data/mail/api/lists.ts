import Bugsnag from '@bugsnag/js'
import fetch from 'isomorphic-unfetch'
import { Event } from 'src/data/events'

type GetListParams = {
  scheduleId?: Event['scheduleId']
}

type ContactList = {
  name: string,
  id: string,
  scheduleId: Event['scheduleId'],
}

export const getList = async ({ scheduleId }: GetListParams): Promise<ContactList> => {
  try {
    const response = await fetch('/.netlify/functions/send-mail/list', {
      method: 'GET',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify({
        scheduleId
      }),
    })

    if (!response.ok) {
      throw new Error(`Could not get list ${scheduleId}`)
    }

    const list = await response.json()
    return {
      id: list.id,
      name: list?.name || '',
      scheduleId
    }
  }
  catch (err) {
    Bugsnag.notify(err)
  }
}

type CreateListParams = {
  scheduleId: Event['scheduleId'],
  name?: string
}

const buildListName = ({ scheduleId, name }: CreateListParams): string => `${scheduleId} - ${name}`

export const createList = async ({ scheduleId, name }): Promise<ContactList> => {
  try {
    const originalList = await getList({ scheduleId })

    if (originalList.id) {
      return originalList
    }

    const response = await fetch('/.netlify/functions/send-mail/list', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify({
        name: buildListName({ scheduleId, name }),
      }),
    })

    if (!response.ok) {
      throw new Error(`Could not create list ${name}`)
    }

    // sendgrid doesn't return the list id in the response
    const newList = await getList({ scheduleId })

    return newList
  }
  catch (err) {
    Bugsnag.notify(err)
  }
}
