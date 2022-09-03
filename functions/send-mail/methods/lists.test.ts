import * as isomorphicUnfetch from 'isomorphic-unfetch'
import { HandlerEvent } from '@netlify/functions'
import getLists, { createList, getListByScheduleId } from './lists'

const event: HandlerEvent = {} as any

describe('getLists', () => {
  it('should return a list of lists', async () => {
    const { statusCode, body } = await getLists(event)
    expect(statusCode).toEqual(200)
    expect(JSON.parse(body)).toEqual([{
      id: '1234',
      name: '420 - Example list',
      contactCount: 1,
      url: 'https://api.sendgrid.com/v3/marketing/lists/1234',
      scheduleId: '420'
    }, {
      id: '5678',
      name: '421 - Example list',
      contactCount: 1,
      url: 'https://api.sendgrid.com/v3/marketing/lists/5678',
      scheduleId: '421'
    }])
  })
})

describe('getListByScheduleId', () => {
  it('should return a list by scheduleId', async () => {
    const { statusCode, body } = await getListByScheduleId({ ...event, body: JSON.stringify({ scheduleId: '420' }) })
    expect(statusCode).toEqual(200)
    expect(JSON.parse(body)).toEqual({
      id: '1234',
      name: '420 - Example list',
      contactCount: 1,
      url: 'https://api.sendgrid.com/v3/marketing/lists/1234',
      scheduleId: '420'
    })
  })

  it('should an empty object if no scheduleId', async () => {
    const { statusCode, body } = await getListByScheduleId({ ...event, body: JSON.stringify({ scheduleId: '000' }) })
    expect(statusCode).toEqual(200)
    expect(JSON.parse(body)).toEqual({})
  })
})

describe('createList', () => {
  const fetchSpy = jest.spyOn(isomorphicUnfetch, 'default')

  beforeEach(() => {
    fetchSpy.mockClear()
  })

  it('should create a list', async () => {
    const { statusCode } = await createList({ ...event, body: JSON.stringify({ name: 'Example list' }) })
    expect(statusCode).toEqual(200)
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('marketing/lists'),
      expect.objectContaining({
        body: JSON.stringify({ name: 'Example list' })
      })
    )
  })
})
