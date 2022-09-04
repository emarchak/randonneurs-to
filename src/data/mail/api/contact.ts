import Bugsnag from "@bugsnag/js"
import { Event } from "src/data/events"
import fetch from 'isomorphic-unfetch'

type Contact = {
  firstName: string
  lastName: string
  email: string
  lists?: string[]
  chapter?: Event['chapter']
}

export const createContact = async ({ firstName, lastName, email, lists = [], ...customFields }: Contact) => {
  try {
    const response = await fetch('/.netlify/functions/send-mail/contact', {
      method: 'PUT',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        lists: lists,
        customFields,
      }),
    })

    if (!response.ok) {
      throw new Error(`Could not add contact`)
    }

    return true
  }
  catch (err) {
    console.log(err)
    Bugsnag.notify(err)
    return false
  }
}
