import { sourceNodes } from "./sourceNodes"
import * as SendAPI from './api'

const exampleSend = {
  id: '1234',
  name: 'Example newsletter',
  status: 'triggered',
  categories: ['category1', 'randolist'],
  send_to: {list_ids: ['randolist']},
  send_at: '2021-06-06T18:14:21Z',
  email_config: {
    subject: 'Example newsletter',
    html_content: 'HTML content http://google.ca'.repeat(200),
    plain_content: 'Plain content'.repeat(200)
  }
}

describe('sourceNodes()', () => {
  const createContentDigest = jest.fn()
  const createNodeId = jest.fn()

  const originalError = console.error
  const consoleError = jest.fn()

  const args = {
    actions: { createNode: jest.fn() },
    createContentDigest,
    createNodeId
  } as any

  beforeEach(() => {
    console.error = consoleError
  })
  afterEach(() => {
    console.error = originalError
    createContentDigest.mockReset()
    createNodeId.mockReset()
  })

  it('creates mail nodes', async () => {
    const getSingleSendSpy = jest.spyOn(SendAPI, 'getSingleSend')
    getSingleSendSpy.mockResolvedValueOnce(exampleSend as SendAPI.SingleSend)

    await Promise.all([
      sourceNodes(args, {} as any, jest.fn())
    ]);
    expect(createNodeId).toHaveBeenCalledWith('1234')
    expect(createContentDigest).toHaveBeenCalledWith({
      id: exampleSend.id,
      categories: exampleSend.categories,
      content: expect.stringContaining('https:'),
      teaser: expect.any(String),
      subject: exampleSend.email_config.subject,
      name: exampleSend.name,
      sentAt: expect.any(Date)
    })
  })

  it('creates mail nodes', async () => {
    createNodeId.mockImplementationOnce(() => {throw Error})

    await Promise.all([
      sourceNodes(args, {} as any, jest.fn())
    ]);

    expect(consoleError).toHaveBeenCalled()
  })
})
