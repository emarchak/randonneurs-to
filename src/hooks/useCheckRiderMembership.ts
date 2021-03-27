import { graphql, useStaticQuery } from 'gatsby'

type MemberType = 'Individual' | 'Family' | 'Trial'
export type Rider = {
  id: string,
  city: string,
  country: string,
  fullName: string,
  membership: MemberType,
  seasons: Number[]
}

const normalize = str => str.toLowerCase().replace(/\s|-|(\(.*\))/g, '')

export const useCheckRiderMembership = () => {
  const { allRider: { nodes: riders } } = useStaticQuery(graphql`
    query {
      allRider {
        nodes {
          city
          country
          id
          membership
          seasons
          fullName
        }
      }
    }
    `)
  const checkMembership = (filter: { fullName: string }) => riders.find(rider => normalize(rider.fullName) === normalize(filter.fullName))

  return ({ checkMembership })
}