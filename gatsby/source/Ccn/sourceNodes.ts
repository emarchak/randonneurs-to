import { GatsbyNode } from 'gatsby'
import fetch from 'cross-fetch'
import { nodeType } from '.'

const ccnEndpoint = process.env.CCN_ENDPOINT || ''

type Membership = 'Individual' | 'Family' | 'Trial'

const TypeMembership: { [key: string]: Membership } = {
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
    throw new Error(`Ccn response ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  accumulator.push(...data.results)

  if (data.next) {
    await fetchPaginatedQuery(data.next, accumulator)
  }

  return accumulator
}

type CcnResponse = {
  id: string
  city: string
  country: string
  fullName: string
  registrationCategory: keyof typeof TypeMembership
  event: string
}

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({
  actions: { createNode },
  createContentDigest,
  createNodeId,
}) => {
  try {
    const response = await fetchPaginatedQuery(ccnEndpoint)
    response.map(snakeToCamelKeys).forEach((data: CcnResponse) => {
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
        id: createNodeId(`${nodeType}-${rider.id}`),
        internal: {
          type: nodeType,
          content: JSON.stringify(rider),
          contentDigest: createContentDigest(rider),
        },
      })
    })
  } catch (error) {
    throw new Error(error)
  }
}
