import { transformResponse, fetchMemberships } from './utils'

export const getMemberships = async () => {
  const response = await fetchMemberships({})
  return response.map((data) => transformResponse(data))
}
