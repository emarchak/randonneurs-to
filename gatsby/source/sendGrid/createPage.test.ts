import { createPages } from "./createPage"

const exampleNode1 = {
  categories: ['randolist'],
  name: 'Example newsletter',
  subject: 'Hello folks!',
  sentAt: 'Sep 05 2021 16:30:10 GMT-0400',
  content: 'Lorem ipsum dolor sit amet',
  teaser: 'Lorem'
}

const exampleNode2 = {
  categories: ['randolist'],
  name: 'Another newsletter',
  subject: 'Hello folks!',
  sentAt: 'Sep 05 2021 16:30:10 GMT-0400',
  content: 'Lorem ipsum dolor sit amet',
  teaser: 'Lorem'
}

describe('createPage()', () => {
  const graphql = jest.fn()
  const createPageSpy = jest.fn()
  const actions = { createPage: createPageSpy }

  graphql.mockResolvedValue({
    data: {
      allMail: {
        nodes: [exampleNode1, exampleNode2]
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

  it('creates mail pages', async () => {
    await Promise.all([
      createPages({graphql, actions} as any, {} as any, jest.fn())
    ]);
    expect(createPageSpy).toHaveBeenCalledTimes(2)
    expect(createPageSpy).toHaveBeenCalledWith({
      path: 'mail/randolist/another-newsletter',
      component: expect.any(String),
      context: expect.objectContaining({
        type: 'mail',
        pageInfo: {
          title: "Another newsletter",
          nextUrl: null,
          nextTitle: null,
          prevTitle: "Example newsletter",
          prevUrl: 'mail/randolist/example-newsletter',
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
