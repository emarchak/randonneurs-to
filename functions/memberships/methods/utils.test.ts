import * as fetch from 'isomorphic-unfetch'
import { fetchMemberships, transformResponse } from "./utils"

describe('transformResponse', () => {
  it('transforms the ccn response', () => {
    const data = {
      id: '123',
      city: 'city',
      country: 'country',
      full_name: 'full name',
      registration_category: 'Family Membership > PRIMARY FAMILY MEMBER',
    }

    expect(transformResponse(data)).toMatchObject({
      id: '123',
      city: 'city',
      country: 'country',
      fullName: 'full name',
      membership: 'Family',
    })
  })

  it('fallsback to individual membership if unknown ', () => {
    const data = {
      id: '123',
      city: 'city',
      country: 'country',
      full_name: 'full name',
      registration_category: 'unknown',
    }

    expect(transformResponse(data)).toMatchObject({
      id: '123',
      city: 'city',
      country: 'country',
      fullName: 'full name',
      membership: 'Individual',
    })
  })
})

describe('fetchMemberships', () => {
  const fetchSpy = jest.spyOn(fetch, 'default')
  beforeEach(() => {
    fetchSpy.mockClear()
  })

  it('calls with paginated data', async () => {
    fetchSpy.mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValue({ results: ['member1'], next: 'https://query2' }),
    } as unknown as Response).mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValue({ results: ['member2'], next: null }),
    } as unknown as Response)

    const response = await fetchMemberships({}, 'https://query1')
    expect(response).toEqual(['member1', 'member2'])
    expect(fetchSpy).toHaveBeenNthCalledWith(1, 'https://query1')
    expect(fetchSpy).toHaveBeenNthCalledWith(2, 'https://query2')
  })

  it('calls with query if provided', async () => {
    fetchSpy.mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValue({ results: ['member1'] }),
    } as unknown as Response)

    const response = await fetchMemberships({ search: 'Rider' }, 'https://query1')
    expect(response).toEqual(['member1'])
    expect(fetchSpy).toHaveBeenNthCalledWith(1, 'https://query1&search=Rider')
  })

  it('throws error on non 200 response', async () => {
    fetchSpy.mockResolvedValueOnce({
      status: 500,
      statusText: 'Internal Server Error',
    } as unknown as Response)
    await expect(fetchMemberships({})).rejects.toThrow('Ccn response 500 Internal Server Error')
  })
})
