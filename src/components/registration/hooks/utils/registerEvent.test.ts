import { Chapter, EventKind } from "src/data/events"
import { registerEvent } from "./registerEvent"
import * as fetch from 'cross-fetch'

const event = {
  eventId: '420',
  name: 'John de la Doe',
  route: '200',
  shareRide: true,
  email: 'test@test.com',
  rideType: EventKind.Brevet,
  chapter: Chapter.Toronto
}

describe('registerEvent', () => {
  const fetchSpy = jest.spyOn(fetch, 'default')

  afterEach(() => {
    fetchSpy.mockClear()
  })

  it('should register a rider', async () => {
    const response = await registerEvent({ ...event })
    expect(response).toBeTruthy()
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('send-mail/contact'),
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify({
          first_name: 'John',
          last_name: 'de la Doe',
          email: 'test@test.com',
          lists: ['1234'],
          custom_fields: { chapter: 'Toronto' }
        })
      })
    )
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('data/ride'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          eventId: 420,
          hideRide: false,
          email: 'test@test.com',
          firstName: 'John',
          lastName: 'de la Doe',
        })
      })
    )
  })

  it('should return early if eventId is missing', async () => {
    const response = await registerEvent({ ...event, eventId: '' })
    expect(response).toBeTruthy()
    expect(fetchSpy).not.toHaveBeenCalledWith()
  })

  it('should return false if list.id is missing', async () => {
    const response = await registerEvent({ ...event, eventId: '999' })
    expect(response).toBeFalsy()
    expect(fetchSpy).not.toHaveBeenCalledWith()
  })
})
