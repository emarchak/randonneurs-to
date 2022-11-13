import * as isomorpicUnfetch from 'cross-fetch'
import Bugsnag from '@bugsnag/js'
import { createContact } from "./contact"
import { Chapter } from 'src/data/events'

describe('createContact', () => {
  const fetchSpy = jest.spyOn(isomorpicUnfetch, 'default')

  afterEach(() => {
    fetchSpy.mockClear()
  })

  it('creates contact', async () => {
    const response = await createContact({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      chapter: Chapter.Toronto,
      lists: ['1234']
    })

    expect(response).toBeTruthy()
    expect(fetchSpy).toHaveBeenCalledWith(
      '/.netlify/functions/send-mail/contact',
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify({
          first_name: 'John',
          last_name: 'Doe',
          email: 'john@doe.com',
          lists: ['1234'],
          custom_fields: { chapter: 'Toronto' },
        })
      }))
  })

  it('handles errors', async () => {
    fetchSpy.mockResolvedValueOnce({ ok: false } as Response)
    const response = await createContact({
      firstName: 'John',
      lastName: 'Doe',
      email: ''
    })
    expect(response).toBeFalsy()
    expect(Bugsnag.notify).toHaveBeenCalledWith('Could not add contact')
  })
})
