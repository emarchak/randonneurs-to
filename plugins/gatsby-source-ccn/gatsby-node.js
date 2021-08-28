/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
const fetch = require('isomorphic-unfetch')

const RIDER_NODE_TYPE = 'rider'
const TypeMembership = {
    'Individual Membership': 'Individual',
    'Family Membership > PRIMARY FAMILY MEMBER': 'Family',
    'Additional Family Member': 'Family',
    'Trial Member': 'Trial',
}

const snakeToCamel = (str) => str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('_', ''))
const snakeToCamelKeys = (o) => Object.keys(o).reduce((c, k) => (c[snakeToCamel(k)] = o[k], c), {})

const fetchPaginatedQuery = async (query, accumulator = []) => {
    const response = await fetch(query)

    if (response.status !== 200) {
        throw new Error(`gatsby-source-ccn response ${response.status} ${response.message}`)
    }

    const data = await response.json()
    accumulator.push(...data.results)

    if (data.next) {
        await fetchPaginatedQuery(data.next, accumulator)
    }

    return accumulator
}

exports.pluginOptionsSchema = ({ Joi }) => {
    return Joi.object({
        ccnEndpoint: Joi.string()
            .description('The endpoint to fetch'),
    })
}

exports.sourceNodes = async (api, pluginOptions) => {
    const {
        actions: { createNode },
        createContentDigest,
        createNodeId,
    } = api
    const { ccnEndpoint } = pluginOptions

    if (!ccnEndpoint) {
        return
    }

    try {
        const response = await fetchPaginatedQuery(ccnEndpoint)
        response.map(snakeToCamelKeys).forEach((data) => {
            const rider = {
                id: data.id,
                city: data.city,
                country: data.country,
                fullName: data.fullName,
                membership: TypeMembership[data.registrationCategory] || TypeMembership['Individual Membership'],
                seasons: [Number(data.event.replace(/\D/g, ''))]
            }

            createNode({
                ...rider,
                id: createNodeId(`${RIDER_NODE_TYPE}-${rider.id}`),
                internal: {
                    type: RIDER_NODE_TYPE,
                    content: JSON.stringify(rider),
                    contentDigest: createContentDigest(rider),
                },
            })
        })
        console.log(`gatsby-source-ccn result Created ${response.length} riders`)
    } catch (error) {
        console.error(error)
    }
}

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions

    const riderTypes = `
        enum Membership {
            Individual
            Family
            Trial
        }

        type ${RIDER_NODE_TYPE} implements Node {
            membership: Membership
        }
    `
    createTypes(riderTypes)
}
