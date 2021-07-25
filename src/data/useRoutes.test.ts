import { renderHook } from '@testing-library/react-hooks'
import * as gatsby from 'gatsby'
import { useRoutes } from './useRoutes'

const routes = [
  {
    id: 1,
    chapter: 'Toronto',
    distance: 200,
    startLocation: 'Starbucks',
    name: 'Urban'
  },
  {
    id: 2,
    chapter: 'Huron',
    distance: 300,
    startLocation: 'Careys House',
    name: 'Golf'
  },
  {
    id: 3,
    chapter: 'Simcoe',
    distance: 90,
    startLocation: 'Tims',
    name: 'Shortest ride'
  },
  {
    id: 4,
    chapter: 'Ottawa',
    distance: 170,
    startLocation: 'Tims',
    name: 'Shorter ride'
  }]


describe('useRoutes()', () => {
  const querySpy = jest.spyOn(gatsby, 'useStaticQuery')

  beforeEach(() => {
    querySpy.mockReturnValue({
      db: { routes }
    })
  })

  afterEach(() => {
    querySpy.mockReset()
  })

  it('returns routes', () => {
    const { result } = renderHook(() => useRoutes())

    expect(result.current.routes).toMatchObject(routes)
  })
})
