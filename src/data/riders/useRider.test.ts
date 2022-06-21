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


  it('returns nothing if no rider', () => {
    const { result } = renderHook(() => useRider({}))

    expect(result.current.data).toBeUndefined()
  })

  it('ignores non-ascii characters', () => {
    const { result } = renderHook(() => useRider({ riderName: 'María (de la) Soledad' }))

    expect(result.current.data).toEqual(expect.objectContaining({ riderName: 'María Soledad' }))
  })

  it('ignores apostrophes', () => {
    const { result } = renderHook(() => useRider({ riderName: 'Brian O\'Malley' }))

    expect(result.current.data).toEqual(expect.objectContaining({ riderName: 'Brian O’Malley' }))
  })

  it('ignores capitalization', () => {
    const { result } = renderHook(() => useRider({ riderName: 'foo bar' }))

    expect(result.current.data).toEqual(expect.objectContaining({ riderName: 'Foo Bar' }))
  })

})
