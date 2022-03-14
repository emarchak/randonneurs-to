
import { chapters, eventTypes, getSeason, sourceNodes } from './sourceNodes'
import * as fetch from 'isomorphic-unfetch'

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

        expect(createNodeId).toHaveBeenCalledWith('event-871')
        expect(createNode).toHaveBeenCalledWith(expect.objectContaining({
            'rwgpsId': '31557200',
            'season': "2021",
        }))
        expect(createContentDigest).toHaveBeenCalledWith(expect.objectContaining({
            'chapter': 'Toronto',
            'contact': 'http://randonneurs.to/registration',
            'date': '2021-06-19T10:00:00.000Z',
            'distance': 300,
            'event': 'Brevet',
            'eventType': 'Brevet',
            'route': 'Kissing Bridge',
            'rwgpsId': '31557200',
            'rwgpsUrl': 'https://ridewithgps.com/routes/31557200',
            'sched_id': '871',
            'season': '2021',
            'startLocation': 'Tim Hortons, 152 Park Lawn Rd, Toronto',
        }))
    })

    it('throws on a failed response', async () => {
        jest.spyOn(fetch, 'default').mockResolvedValueOnce({
            status: 'not okay',
            json: jest.fn().mockResolvedValueOnce({})
        } as any)

        await expect(async () => {
            await sourceNodes(args, pluginOptions, pluginCallback)
        }).rejects.toThrow('randOnt response not okay')
    })

    it('throws on a failed node creation', async () => {
        createNode.mockImplementation(() => { throw new Error('failed') })
        await expect(async () => {
            await sourceNodes(args, pluginOptions, pluginCallback)
        }).rejects.toThrow('failed')
    })
})

describe('getSeason()', () => {
    it('returns current year for events', () => {
        const season = getSeason(new Date('2020-09-01T00:00:00.000Z'))
        expect(season).toBe("2020")
    })
})

describe('chapters()', () => {
    it('returns returns known chapters and other', () => {
        expect(chapters('Toronto')).toBe('Toronto')
        expect(chapters('Huron')).toBe('Huron')
        expect(chapters('Simcoe-Muskoka')).toBe('Simcoe')
        expect(chapters('XOttawa')).toBe('Ottawa')
        expect(chapters('Club')).toBe('Club')
        expect(chapters('Something weird')).toBe('Other')
    })
})
describe('eventTypes()', () => {
    it('returns returns known event types and other', () => {
        expect(eventTypes('Brevet')).toBe('Brevet')
        expect(eventTypes('Permanent')).toBe('Permanent')
        expect(eventTypes('Something weird')).toBe('Other')
    })
})
