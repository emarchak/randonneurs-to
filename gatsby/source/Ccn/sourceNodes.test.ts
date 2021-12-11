import { sourceNodes } from './sourceNodes'

describe('sourceNodes', () => {
  const createNode = jest.fn().mockName('createNode')
  const createContentDigest = jest.fn().mockName('createContentDigest')
  const createNodeId = jest.fn().mockName('createNodeId')

  const pluginOptions = {} as any
  const pluginCallback = jest.fn().mockName('pluginCallback')
  const args = { actions: { createNode }, createContentDigest, createNodeId } as any

  afterEach(() => {
    createNode.mockClear()
    createContentDigest.mockClear()
    createNodeId.mockClear()
  })

  it('processes input', async () => {
    await Promise.all([
        sourceNodes(args, pluginOptions, pluginCallback)
    ])
    expect(createNodeId).toHaveBeenCalledTimes(4)
    expect(createNodeId).toHaveBeenCalledWith('rider-1')
    expect(createNode).toHaveBeenCalledWith(expect.objectContaining({
        city: 'Toronto',
        country: 'Canada',
        seasons: [2021],
        fullName: 'Baz Boo',
        membership: 'Individual',
    }))
    expect(createNode).toHaveBeenCalledWith(expect.objectContaining({
        city: 'Toronto',
        country: 'Canada',
        seasons: [2021],
        fullName: 'Brill Bruiser',
        membership: 'Individual',
    }))
    expect(createContentDigest).toHaveBeenCalledWith(expect.objectContaining({
        city: 'Toronto',
        country: 'Canada',
        seasons: [2021],
        fullName: 'Bil Bar',
        membership: 'Family',
    }))
  })
})
