import * as isomorphicUnfetch from 'cross-fetch'
import { HandlerEvent } from '@netlify/functions'
import getLists, { addList, getListByScheduleId } from './lists'

const event: HandlerEvent = {} as any
describe('send-mail', () => {
  const fetchSpy = jest.spyOn(isomorphicUnfetch, 'default')

  afterEach(() => {
    fetchSpy.mockClear()
  })

  it('should getLists', async () => {
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

  it('should handle errors with getLists', async () => {
    fetchSpy.mockRejectedValueOnce(new Error('Something went wrong'))
    const { statusCode } = await getLists(event)

    expect(statusCode).toEqual(500)
  })

  it('should getListByScheduleId', async () => {
    const { statusCode, body } = await getListByScheduleId({ ...event, queryStringParameters: { scheduleId: '420' } })
    expect(statusCode).toEqual(200)
    expect(JSON.parse(body)).toEqual({
      id: '1234',
      name: '420 - Example list',
      contactCount: 1,
      url: 'https://api.sendgrid.com/v3/marketing/lists/1234',
      scheduleId: '420'
    })
  })


  it('should return an empty object if no getListByScheduleId', async () => {
    const { statusCode, body } = await getListByScheduleId({ ...event, queryStringParameters: { scheduleId: '000' } })
    expect(statusCode).toEqual(200)
    expect(JSON.parse(body)).toEqual({})
  })

  it('should addlist', async () => {
    const { statusCode } = await addList({ ...event, body: JSON.stringify({ name: 'Example list' }) })
    expect(statusCode).toEqual(200)
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('marketing/lists'),
      expect.objectContaining({
        body: JSON.stringify({ name: 'Example list' })
      })
    )
  })

  it('should handle errors with getListByScheduleId', async () => {
    fetchSpy
      .mockRejectedValueOnce(new Error('Something went wrong'))
    const { statusCode } = await getListByScheduleId(event)

    expect(statusCode).toEqual(500)
    fetchSpy.mockClear()
  })

  it('should handle errors with addList', async () => {
    fetchSpy.mockRejectedValueOnce(new Error('Something went wrong'))
    const { statusCode } = await addList({ ...event, body: JSON.stringify({ name: 'Example list' }) })

    expect(statusCode).toEqual(500)
    fetchSpy.mockClear()
  })
})
