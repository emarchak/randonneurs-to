import { HandlerEvent } from '@netlify/functions'
import * as fetch from 'isomorphic-unfetch'
import customFields from '../customFields'
import addContact from './contact'

describe('send', () => {
  const fetchMock = jest.spyOn(fetch, 'default')

  beforeEach(() => {
    fetchMock.mockImplementation(async (endpoint): Promise<Response> => {
      if (typeof endpoint === 'string' && endpoint.includes('field_definitions')) {
        return {
          status: 200,
          statusText: 'OK',
          json: () => ({ custom_fields: customFields }),
        } as any
      }
      return {
        status: 200,
        statusText: 'OK'
      } as Response
    })
  })

  afterEach(() => {
    fetchMock.mockClear()
  })

  it('returns 500 if missing email', async () => {
    const event: HandlerEvent = {
      body: JSON.stringify({})
    } as any

    const response = await addContact(event)
    expect(response).toEqual({
      statusCode: 500,
      body: '\"Email is required\"'
    })
  })

  it('returns 500 if field definition missing', async () => {
    const event: HandlerEvent = {
      body: JSON.stringify({
        first_name: 'Test',
        last_name: 'User',
        email: 'test@email.com',
        customFields: { missing_field: 'not here' }
      })
    } as any

    const response = await addContact(event)
    expect(response).toEqual({
      statusCode: 500,
      body: '\"Could not find field definition for missing_field\"'
    })
  })

  it('returns 200 if successful', async () => {
    const event: HandlerEvent = {
      body: JSON.stringify({
        first_name: 'Test',
        last_name: 'User',
        email: 'test@email.com',
        customFields: {
          chapter: 'Toronto',
        }
      })
    } as any

    const response = await addContact(event)

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('contacts'),
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify({
          list_ids: [],
          contacts: [{
            first_name: 'Test',
            last_name: 'User',
            email: 'test@email.com',
            custom_fields: { e1_T: 'Toronto' }
          }]
        })
      }))
    expect(response).toEqual({ statusCode: 200, body: '{\"status\":200,\"statusText\":\"OK\"}' })
  })
})
