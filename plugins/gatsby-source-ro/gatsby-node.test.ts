
import gatsbySourceRo from './gatsby-node'

jest.mock('isomorphic-unfetch', () => jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({
        status: 'ok', schedule: [
            {
                Sched_Id: '884',
                Chapter: 'Toronto',
                Event: 'Brevet',
                Distance: '200',
                Date: '2021-10-09',
                Route: 'Castle',
                StartLoc: 'Grimsby Information Center, 424 S Service Rd, Grimsby',
                Stime: '08:00:00',
                Organizer: 'Register',
                Contact: 'http://randonneurs.to/registration',
                RWGPS: 'https://ridewithgps.com/routes/25673993',
                Unixtime: 1633780800
            }
        ]
    })
}))


describe('gatsby-source-ro', () => {
    it('processes input', async () => {
        const createNode = jest.fn()
        const createContentDigest = jest.fn()
        const createNodeId = jest.fn()

        await gatsbySourceRo.sourceNodes({ actions: { createNode }, createContentDigest, createNodeId })

        expect(createNodeId).toHaveBeenCalledWith('event-884')
        expect(createNode).toHaveBeenCalledWith(expect.objectContaining({
            'time': '2021-10-09T12:00:00.000Z',
            'rwgpsId': '25673993',
            'season': 2021,
        }))
        expect(createContentDigest).toHaveBeenCalledWith({
            'chapter': 'Toronto',
            'contact': 'http://randonneurs.to/registration',
            'date': '2021-10-09',
            'distance': '200',
            'event': 'Brevet',
            'organizer': 'Register',
            'route': 'Castle',
            'rwgps': 'https://ridewithgps.com/routes/25673993',
            'rwgpsId': '25673993',
            'sched_id': '884',
            'season': 2021,
            'startloc': 'Grimsby Information Center, 424 S Service Rd, Grimsby',
            'stime': '08:00:00',
            'time': '2021-10-09T12:00:00.000Z',
            'unixtime': 1633780800,
        })
    })
})