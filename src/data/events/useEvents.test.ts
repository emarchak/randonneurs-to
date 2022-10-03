import { renderHook } from '@testing-library/react-hooks'
import { useEvents, Chapter } from './useEvents'

describe('useEvents()', () => {
  it('filters by date', () => {
    const after = new Date('August 30 2021')
    const { result: { current } } = renderHook(() => useEvents({ after }))

    current.brevets.forEach((brevet) => {
      expect(brevet.date.valueOf()).toBeGreaterThan(after.valueOf())
    })
  })

  it('sorts by date', () => {
    const after = new Date('Jan 1 2019')
    const { result } = renderHook(() => useEvents({ after }))

    expect(result.current.brevets[0].date.valueOf())
      .toBeLessThan(result.current.brevets[1].date.valueOf())
  })

  it('filters by chapter', () => {
    const { result } = renderHook(() => useEvents({ chapter: Chapter.Toronto }))

    result.current.brevets.forEach((brevet) => {
      expect(brevet.chapter).toEqual(Chapter.Toronto)
    })
  })

  it('slices by limit', () => {
    const limit = 1
    const { result } = renderHook(() => useEvents({ limit }))

    expect(result.current.brevets).toHaveLength(limit)
  })

  it('returns all if no limit', () => {
    const { result } = renderHook(() => useEvents({ limit: false }))

    expect(result.current.brevets).toHaveLength(2)
  })
})
