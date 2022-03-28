import { transformResponse, fetchMemberships } from './utils'

export const getMembership = async ({ search }: { search?: string }) => {
  const response = await fetchMemberships({ search })
  return response.map((data) => transformResponse(data)).pop()
}
