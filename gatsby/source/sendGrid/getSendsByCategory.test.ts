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
          send_at: '2021-06-06T18:14:21Z',
          email_config: {
            html_content: expect.any(String),
            plain_content: expect.any(String)
          }
        }
      ])
  })

  it('returns empty if rejected', async () => {
    const getSingleSendsSpy = jest.spyOn(SendAPI, 'getSingleSends')
    getSingleSendsSpy.mockRejectedValueOnce(null)

    const [ response ] = await Promise.all([
      getSendsByCategory('randolist')
    ])

    expect(response).toEqual([])
  })


  it('returns empty if none found', async () => {
    const getSingleSendsSpy = jest.spyOn(SendAPI, 'getSingleSends')
    getSingleSendsSpy.mockReturnValueOnce(null)

    const [ response ] = await Promise.all([
      getSendsByCategory('randolist')
    ])

    expect(response).toEqual([])
  })
})
