import { HandlerEvent } from "@netlify/functions"
import { getSendsByCategory } from "./singlesend"

describe('getSendsByCategory()', () => {
  it('fetches singlesends by category', async () => {
    const response = await getSendsByCategory({
      body: JSON.stringify({category: 'category1'})
    } as HandlerEvent)

    const data = JSON.parse(response.body)

    data.forEach((singleSend) => {
      expect(singleSend.categories).toContain('category1')
    })
  })
})
