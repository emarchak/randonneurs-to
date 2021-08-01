import { useBlog } from '.'
import { renderHook } from '@testing-library/react-hooks'
import * as gatsby from 'gatsby'

const mockPost = {
  title: 'Ride Report: Mnjikaning 400k brevet',
  link: 'https://blog.randonneursontario.ca/?p=1265',
  content: {
    encodedSnippet: 'Lorem ipsum '.repeat(500)
  }
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
    const { result } = renderHook(() => useBlog({}))
    expect(result.current.posts[0]).toEqual(expect.objectContaining({
      'title': 'Ride Report: Mnjikaning 400k brevet',
      'link': 'https://blog.randonneursontario.ca/?p=1265',
      'teaser': expect.any(String)
    }))
    expect(result.current.posts[0].teaser).toHaveLength(603)
  })

  it('trims to limit', () => {
    querySpy.mockReturnValue({
      allFeedblog: { nodes: [mockPost, mockPost, mockPost] }
    })

    const { result } = renderHook(() => useBlog({limit: 1}))
    expect(result.current.posts).toHaveLength(1)
  })

})
