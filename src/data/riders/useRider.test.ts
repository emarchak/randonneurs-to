import { renderHook } from '@testing-library/react-hooks'
import { useRider } from './useRider'

describe('useRider()', () => {
  it('returns rider if found', () => {
    const { result } = renderHook(() => useRider({ riderName: 'Foo Bar' }))

    expect(result.current.data).toEqual(expect.objectContaining({ riderName: 'Foo Bar' }))
  })
  it('returns nothing if not found', () => {
    const { result } = renderHook(() => useRider({ riderName: 'Noname Rider' }))

    expect(result.current.data).toBeUndefined()
  })
})
