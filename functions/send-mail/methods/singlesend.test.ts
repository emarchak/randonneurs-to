import { HandlerEvent } from "@netlify/functions"
import { getSendsByCategory } from "./singlesend"

describe('getSendsByCategory()', () => {
  it('fetches singlesends by category', async () => {
    const event: HandlerEvent = {queryStringParameters: {category: 'category1'}} as any
    const response = await getSendsByCategory(event)

    const data = JSON.parse(response.body)

    data.forEach((singleSend) => {
      expect(singleSend.categories).toContain('category1')
    })
  })
})
