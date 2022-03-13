import { HandlerEvent } from '@netlify/functions'
import * as Utils from './utils'
import { syncEvents } from './events'

const rawEvent: Utils.RawEvent = {
  Sched_Id: '1',
  Chapter: 'Toronto',
  Event: 'Populaire',
  Distance: '60',
  Route: 'Rouge Ramble',
  StartLoc: 'Tim Hortons',
  RWGPS: 'https://ridewithgps.com/routes/27003525',
  Unixtime: 1647097200
}

describe('createRide', () => {
  const fetchQueryMock = jest.spyOn(Utils, 'fetchQuery')
  const fetchEventsMock = jest.spyOn(Utils, 'fetchEvents').mockResolvedValue([rawEvent])

  fetchQueryMock.mockImplementation((query) => {
    if (query.match(/mutation CreateRoutes/)) {
      return Promise.resolve({ data: { insert_route: { returning: [{ route_id: 101, route_name: rawEvent.Route }] } } })
    }
    if (query.match(/mutation CreateEvents/)) {
      return Promise.resolve({
        data: { response: true },
      })
    }
  })

  afterEach(() => {
    fetchQueryMock.mockClear()
    fetchEventsMock.mockClear()
  })

  it('calls expected queries', async () => {
    const response = await syncEvents({} as HandlerEvent)
    expect(response).toMatchObject({
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        response: true,
      }),
    })

    expect(fetchQueryMock).toHaveBeenNthCalledWith(1, expect.stringContaining(JSON.stringify([{
      route_distance: 60,
      route_name: rawEvent.Route,
      route_start_location: rawEvent.StartLoc,
      route_cuesheet: rawEvent.RWGPS,
      route_chapter: 1,
      route_active: true,
    }])))
    expect(fetchQueryMock).toHaveBeenNthCalledWith(2, expect.stringContaining(JSON.stringify([{
      event_id: 1,
      event_name: rawEvent.Route,
      event_date: new Date(rawEvent.Unixtime * 1000).toISOString(),
      event_eventtype: 2,
      event_route: 101
    }])))
  })

  it('handles errors', async () => {
    fetchQueryMock.mockRejectedValueOnce({ errors: true })

    const response = await syncEvents({} as HandlerEvent)
    expect(response).toMatchObject({
      statusCode: 500,
    })
  })
})
