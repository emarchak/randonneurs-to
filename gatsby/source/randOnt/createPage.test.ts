import { createPages } from "./createPage"

describe('createPage()', () => {
  const graphql = jest.fn()
  const createPageSpy = jest.fn()
  const actions = { createPage: createPageSpy }

  graphql.mockResolvedValue({
    data: {
      allEvent: {
        group: [2020, 2021, 2022].map(year => ({fieldValue: year}))
      }
    }
  })
  const originalError = console.error
  const consoleError = jest.fn()

  beforeEach(() => {
    console.error = consoleError
  })

  afterEach(() => {
    console.error = originalError
    createPageSpy.mockReset()
    graphql.mockReset()
  })

  it('creates event pages', async () => {
    await Promise.all([
      createPages({graphql, actions} as any, {} as any, jest.fn())
    ]);
    expect(createPageSpy).toHaveBeenCalledTimes(3)
    expect(createPageSpy).toHaveBeenCalledWith({
      path: 'seasons/2021',
      component: expect.any(String),
      context: expect.objectContaining({
        id: 2021,
        type: 'season',
        pageInfo: {
          title: 2021,
          nextUrl: 'seasons/2022',
          nextTitle: 2022,
          prevTitle: 2020,
          prevUrl: 'seasons/2020',
        }
      })
    })
  })

  it('throws error if unable to find result', async () => {
    graphql.mockResolvedValueOnce({errors: true})

    await Promise.all([
      createPages({graphql, actions} as any, {} as any, jest.fn())
    ])
    expect(consoleError).toHaveBeenCalled()
  })
})
