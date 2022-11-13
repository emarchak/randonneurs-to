import fetch from 'cross-fetch'

const ccnEndpoint = process.env.CCN_ENDPOINT || ''

type MembershipType = 'Individual' | 'Family' | 'Trial'

export type Membership = {
  id: string,
  city: string,
  country: string,
  riderName: string,
  type: MembershipType,
}

const TypeMembership: { [key: string]: MembershipType } = {
  'Individual Membership': 'Individual',
  'Family Membership > PRIMARY FAMILY MEMBER': 'Family',
  'Additional Family Member': 'Family',
  'Trial Member': 'Trial',
}

type CcnResponse = {
  id: string
  city: string
  country: string
  full_name: string
  registration_category: keyof typeof TypeMembership
}

export const fetchMemberships = async ({ search }: { search?: string }, query = ccnEndpoint, accumulator: CcnResponse[] = []) => {
  const response = await fetch(search ? query + `&search=${encodeURIComponent(search)}` : query)
  if (response.status !== 200) {
    throw new Error(`Ccn response ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  accumulator.push(...data.results)

  if (data.next) {
    await fetchMemberships({}, data.next, accumulator)
  }

  return accumulator
}

export const transformResponse = (data: CcnResponse): Membership => ({
  id: data.id,
  city: data.city,
  country: data.country,
  riderName: data.full_name,
  type: TypeMembership[data.registration_category] || TypeMembership['Individual Membership'],
})
