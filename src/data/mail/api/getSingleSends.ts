import fetch from 'isomorphic-unfetch'
import { urlEncode } from 'src/utils'

type getSinglesendsParams = {
    category: string,
}

export const getSinglesends = async (params: getSinglesendsParams) => {

  try {
      const response = await fetch(`/.netlify/functions/send-mail/singlesends?${urlEncode(params)}`, {
          method: 'GET',
      })

      return response
  }
  catch (err) {
      return false
  }
}
