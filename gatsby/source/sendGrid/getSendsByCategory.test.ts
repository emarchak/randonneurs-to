import { getSendsByCategory } from "./getSendsByCategory"
import * as SendAPI from './api'

describe('getSendsByCategory()', () => {
  it('returns send data', async () => {
    const [ response ] = await Promise.all([
      getSendsByCategory('randolist')
    ])

    expect(response).toEqual(
      [
        {
          id: '1234',
          name: 'Example newsletter',
          status: 'triggered',
          categories: ['category1', 'randolist'],
          send_at: '2021-06-06T18:14:21Z'
        }
      ])
  })

  it('returns empty if no response', async () => {
    const getSingleSendsSpy = jest.spyOn(SendAPI, 'getSingleSends')
    getSingleSendsSpy.mockRejectedValueOnce(null)

    const [ response ] = await Promise.all([
      getSendsByCategory('randolist')
    ])

    expect(response).toEqual([])
  })
})
