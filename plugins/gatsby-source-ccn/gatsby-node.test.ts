
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
                registration_category: 'Family Membership > PRIMARY FAMILY MEMBER',
                team_category: '',
                team_name: '',
            },
            {
                city: 'Toronto',
                country: 'Canada',
                event: 'Randonneurs Ontario Membership 2021',
                full_name: 'Brill Bruiser',
                id: 3,
                registration_category: 'fake category',
                team_category: '',
                team_name: '',
            }],
            next: null
        })
    })
)


const joiArg = (arg) => ({ ...arg, required: jest.fn().mockReturnValue({ description: jest.fn() }) })
const Joi = {
    object: joiArg,
    string: joiArg
}

describe('gatsby-source-ccn', () => {
    it('processes input', async () => {
        const createNode = jest.fn()
        const createContentDigest = jest.fn()
        const createNodeId = jest.fn()
        const options = gatsbySourceCcn.pluginOptionsSchema({ Joi })
        await gatsbySourceCcn.sourceNodes({ actions: { createNode }, createContentDigest, createNodeId }, options)

        expect(createNodeId).toHaveBeenCalledTimes(4)
        expect(createNodeId).toHaveBeenCalledWith('rider-1')
        expect(createNode).toHaveBeenCalledWith(expect.objectContaining({
            city: 'Toronto',
            country: 'Canada',
            seasons: [2021],
            fullName: 'Baz Boo',
            category: 'Individual',
        }))
        expect(createNode).toHaveBeenCalledWith(expect.objectContaining({
            city: 'Toronto',
            country: 'Canada',
            seasons: [2021],
            fullName: 'Brill Bruiser',
            category: 'Individual',
        }))
        expect(createContentDigest).toHaveBeenCalledWith(expect.objectContaining({
            city: 'Toronto',
            country: 'Canada',
            seasons: [2021],
            fullName: 'Bil Bar',
            category: 'Family',
        }))
    })
})