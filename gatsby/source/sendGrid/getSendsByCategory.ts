import { getSingleSend, getSingleSends } from './api'

type Categories = 'randolist'

export const getSendsByCategory = async (category: Categories) => {
  try {
    const response = await getSingleSends()

    if (!response) {
      throw new Error('No sends found')
    }

    const singleSends = response.filter((singleSend) => (category ? singleSend.categories.includes(category) : true)
      && singleSend.status === 'triggered')

    const fullData = await Promise.all(singleSends.map(async ({ id }) => {
      const response = await getSingleSend(id)
      return response
    }))

    return fullData

  }
  catch (err) {
    return []
  }
}
