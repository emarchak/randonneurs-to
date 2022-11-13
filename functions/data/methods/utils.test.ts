import * as fetch from 'cross-fetch'
import { brevetDistance, fetchEvents, fetchQuery } from './utils'

describe('fetchEvents', () => {
  const responseMock = jest.fn().mockName('reponse.json()')
  const fetchMock = jest.spyOn(fetch, 'default')

  beforeEach(() => {
    fetchMock.mockResolvedValue({ json: responseMock } as any)
  })
  afterEach(() => {
    fetchMock.mockClear()
    responseMock.mockClear()
  })

  it('throws an error if response its not okay', async () => {
    responseMock.mockResolvedValueOnce({ status: 'not okay' })

    await expect(fetchEvents()).rejects.toThrow('Failed to fetch events')
  })

  it('returns the scheduled data', async () => {
    responseMock.mockResolvedValueOnce({
      status: 'ok',
      schedule: ['event1', 'event2'],
    })
    const response = await fetchEvents()

    expect(response).toEqual(['event1', 'event2'])
  })
})

describe('fetchQuery', () => {
  const responseMock = jest.fn().mockName('reponse.json()')
  const fetchMock = jest.spyOn(fetch, 'default')

  beforeEach(() => {
    fetchMock.mockResolvedValue({ json: responseMock } as any)
  })

  afterEach(() => {
    fetchMock.mockClear()
    responseMock.mockClear()
  })

  it('fetches the query with expected headers', async () => {
    responseMock.mockResolvedValue(true)
    const response = await fetchQuery('query { response }')
    expect(response).toEqual(true)

    expect(fetchMock).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
      body: JSON.stringify({ query: 'query { response }' }),
    }))
  })
})

describe('brevetDistance', () => {
  it('returns undefined for rides under 200', () => {
    expect(brevetDistance(90)).toBeUndefined()
    expect(brevetDistance(101)).toBeUndefined()
  })
  it('returns distanced rounded to the nearest 100', () => {
    expect(brevetDistance(201)).toBe(200)
    expect(brevetDistance(290)).toBe(300)
    expect(brevetDistance(1201)).toBe(1200)
  })
})
