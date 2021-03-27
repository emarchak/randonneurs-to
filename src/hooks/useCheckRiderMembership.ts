
import { graphql, useStaticQuery } from 'gatsby'

type MemberCategory = 'Individual' | 'Family' | 'Trial'
export type Rider = {
  id: string,
  city: string,
  country: string,
  fullName: string,
  category: MemberCategory,
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
          category
          seasons
          fullName
        }
      }
    }
    `)
  const checkMembership = (filter: { fullName: string }) => riders.find(rider => normalize(rider.fullName) === normalize(filter.fullName))

  return ({ checkMembership })
}