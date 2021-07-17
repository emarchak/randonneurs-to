import { renderHook } from '@testing-library/react-hooks'
import * as isomorphicUnfetch from 'isomorphic-unfetch'
import { useSheets } from './useSheets'

describe('useSheets()', () => {
  const fetchSpy = jest.spyOn(isomorphicUnfetch, 'default')

  afterEach(() => {
    fetchSpy.mockClear()
  })

  it('calls lambda function', async () => {
    const { result } = renderHook(() => useSheets())
    const rowToAdd = {
      sheet: 'registration',
      row: {
        name: 'Fast rider',
        email: 'test@example.com',
        isFast: true,
        isSlow: false
      }
    }
    const response = await result.current.addRow(rowToAdd)

    expect(response).toEqual(true)
    expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/sheets', expect.objectContaining({
      body: JSON.stringify({
        sheet: 'registration',
        row: {
          name: 'Fast rider',
          email: 'test@example.com',
          isFast: 'Yes',
          isSlow: 'No'
        }
      })
    }))
  })

  it('returns false on error', async () => {
    fetchSpy.mockRejectedValueOnce({ ok: false })
    const { result } = renderHook(() => useSheets())

    const response = await result.current.addRow({
      sheet: 'registration',
      row: {
        name: 'Fast rider',
        email: 'test@example.com'
      }
    })

    expect(response).toEqual(false)
  })

  it('returns throws error on missing sheet', async () => {
    const { result } = renderHook(() => useSheets())

    await expect(async () => {
      await result.current.addRow({
        sheet: 'missing',
        row: {
          name: 'Lost rider',
          email: 'test@example.com'
        }
      })
    }).rejects.toThrowError()
  })

})