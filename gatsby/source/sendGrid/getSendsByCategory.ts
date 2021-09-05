import { getSingleSend, getSingleSends } from './api'

type Categories = 'randolist'

export const getSendsByCategory = async (category: Categories) => {
  try {
    const response = await getSingleSends()

    const singleSends = response.filter((singleSend) => (category ? singleSend.categories.includes(category) : true)
      && singleSend.status === 'triggered')

    const fullData = await Promise.all(singleSends.map(async ({ id }) => {
      const response = await getSingleSend(id)
      return response
    }))

    return fullData

  }
  catch (err) {
    console.log(err)
    return []
  }
}
