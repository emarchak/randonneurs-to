import { renderHook } from '@testing-library/react-hooks'
import { useEvents } from './useEvents'

jest.mock('gatsby', () => ({
  __esModule: true,
  graphql: jest.fn(),
  useStaticQuery: jest.fn().mockReturnValue({
    allEvent: {
      nodes: [
        {
          chapter: 'Toronto',
          distance: 200,
          event: 'brevet',
          id: 1,
          route: 'Waterfront East',
          rwgpsUrl: 'https://ridewithgps.com/routes/20784084',
          startLocation: 'Rouge GO',
          date: 'September 7 2021 08:00 EDT'
        },
        {
          chapter: 'Huron',
          distance: 200,
          event: 'brevet',
          id: 1,
          route: 'Waterfront East',
          rwgpsUrl: 'https://ridewithgps.com/routes/20784084',
          startLocation: 'Rouge GO',
          date: 'August 1 2021 08:00 EDT'
        }]
    }
  })
}))

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
    const chapter = 'Toronto'
    const { result } = renderHook(() => useEvents({ chapter }))

    result.current.brevets.forEach((brevet) => {
      expect(brevet.chapter).toEqual(chapter)
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
