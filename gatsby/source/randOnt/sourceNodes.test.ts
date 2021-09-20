
import { sourceNodes } from './sourceNodes'

describe('sourceNodes', () => {
    it('processes input', async () => {
        const createNode = jest.fn()
        const createContentDigest = jest.fn()
        const createNodeId = jest.fn()

        const args = { actions: { createNode }, createContentDigest, createNodeId } as any

        await Promise.all([
            sourceNodes(args, {} as any, jest.fn())
        ]);

        expect(createNodeId).toHaveBeenCalledWith('event-884')
        expect(createNode).toHaveBeenCalledWith(expect.objectContaining({
            'date': '2021-10-09T12:00:00.000Z',
            'rwgpsId': '25673993',
            'season': 2021,
        }))
        expect(createContentDigest).toHaveBeenCalledWith(expect.objectContaining({
            'chapter': 'Toronto',
            'distance': 200,
            'event': 'Brevet',
            'route': 'Castle',
            'rwgpsUrl': 'https://ridewithgps.com/routes/25673993',
            'rwgpsId': '25673993',
            'season': 2021,
            'startLocation': 'Grimsby Information Center, 424 S Service Rd, Grimsby',
            'date': '2021-10-09T12:00:00.000Z',

        }))
    })
})
