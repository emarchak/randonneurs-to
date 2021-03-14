/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
const fetch = require('isomorphic-unfetch')

const RIDER_NODE_TYPE = 'rider'
const CCN_ENDPOINT = ''

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

exports.sourceNodes = async ({
    actions,
    createContentDigest,
    createNodeId,
}) => {
    const { createNode } = actions

    try {
        const response = await fetchPaginatedQuery(CCN_ENDPOINT)
        response.map(snakeToCamelKeys).forEach((rider) => {
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
    } catch (error) {
        console.error(error)
    }
}

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions

    const riderTypes = `
        enum RegistrationCategory {
            Individual Membership
            "Family Membership > PRIMARY FAMILY MEMBER"
            Additional Family Member
            Trial Member
        }

        type ${RIDER_NODE_TYPE} implements Node {
            registrationCategory: RegistrationCategory
        }
    `
    createTypes(riderTypes)
}