export { registerRider } from './api/registerRider'
export { useRider } from './useRider'

type MemberType = 'Individual' | 'Family' | 'Trial'
export type Rider = {
  id: string,
  city: string,
  country: string,
  fullName: string,
  membership: MemberType,
  seasons: Number[]
}
