import { useBlog } from '.'
import { renderHook } from '@testing-library/react-hooks'
import * as gatsby from 'gatsby'

const mockPost = {
  'title': 'Ride Report: Mnjikaning 400k brevet',
  'link': 'https://blog.randonneursontario.ca/?p=1265',
  'contentSnippet': 'Written by Tiago Varella-Cid Brevet complete 17 July 2021 With recent pandemic restrictions it’s been uplifting to see the return of various cycling events. And although I’m not that excited at the prospect of racing XC or gravel races in … Continue reading →'
}

describe('useBlog()', () => {
  const querySpy = jest.spyOn(gatsby, 'useStaticQuery')

  beforeEach(() => {
    querySpy.mockReturnValue({
      allFeedblog: { nodes: [mockPost] }
    })
  })

  afterEach(() => {
    querySpy.mockReset()
  })

  it('returns trimmed teasers', () => {
    const { result } = renderHook(() => useBlog())
    expect(result.current.posts[0]).toMatchObject({
      'title': 'Ride Report: Mnjikaning 400k brevet',
      'link': 'https://blog.randonneursontario.ca/?p=1265',
      'teaser': 'Written by Tiago Varella-Cid Brevet complete 17 July 2021 With recent pandemic restrictions it’s been uplifting to see the return of various cycling events. And although I’m not that excited at the prospect of racing XC or gravel races in …'
    })
  })
})
