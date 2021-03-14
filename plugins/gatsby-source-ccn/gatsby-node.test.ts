
import gatsbySourceCcn from './gatsby-node'

jest.mock('isomorphic-unfetch', () => jest.fn()
    .mockResolvedValueOnce({
        status: 200,
        json: jest.fn().mockResolvedValue({
            results: [{
                city: 'Ottawa',
                country: 'Canada',
                event: 'Randonneurs Ontario Membership 2021',
                full_name: 'Foo Bar',
                id: 1,
                registration_category: 'Individual Membership',
                team_category: '',
                team_name: '',
            },
            {
                city: 'Toronto',
                country: 'Canada',
                event: 'Randonneurs Ontario Membership 2021',
                full_name: 'Baz Boo',
                id: 2,
                registration_category: 'Individual Membership',
                team_category: '',
                team_name: '',
            }],
            next: 'pg=2'
        })
    })
    .mockResolvedValueOnce({
        status: 200,
        json: jest.fn().mockResolvedValue({
            results: [{
                city: 'Toronto',
                country: 'Canada',
                event: 'Randonneurs Ontario Membership 2021',
                full_name: 'Bil Bar',
                id: 3,
                registration_category: 'Family Membership',
                team_category: '',
                team_name: '',
            }],
            next: null
        })
    })
)

describe('gatsby-source-ccn', () => {
    it('processes input', async () => {
        const createNode = jest.fn()
        const createContentDigest = jest.fn()
        const createNodeId = jest.fn()

        await gatsbySourceCcn.sourceNodes({ actions: { createNode }, createContentDigest, createNodeId })

        expect(createNodeId).toHaveBeenCalledTimes(3)
        expect(createNodeId).toHaveBeenCalledWith('rider-1')
        expect(createNode).toHaveBeenCalledWith(expect.objectContaining({
            city: 'Toronto',
            country: 'Canada',
            event: 'Randonneurs Ontario Membership 2021',
            fullName: 'Baz Boo',
            registrationCategory: 'Individual Membership',
        }))
        expect(createContentDigest).toHaveBeenCalledWith(expect.objectContaining({
            city: 'Toronto',
            country: 'Canada',
            event: 'Randonneurs Ontario Membership 2021',
            fullName: 'Bil Bar',
            registrationCategory: 'Family Membership',
        }))
    })
})