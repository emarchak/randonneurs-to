import { transformResponse, fetchMemberships } from './utils'

export const getMemberships = async ({ search }: { search?: string }) => {
  const response = await fetchMemberships({ search })
  return response.map((data) => transformResponse(data))
}
