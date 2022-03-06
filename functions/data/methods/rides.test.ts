import { HandlerEvent } from '@netlify/functions'
import * as Utils from './utils'
import { createRide } from './rides'

const registrationData = {
    event_id: 10,
    hidden: false,
    email: 'test@email.com',
    firstname: 'Lael',
    lastname: 'Wilcox',
    gender: 'F',
    startime: '2020-01-01T00:00:00Z',
}

describe('createRide', () => {
    const fetchQueryMock = jest.spyOn(Utils, 'fetchQuery')
    fetchQueryMock.mockImplementation((query) => {
        if (query.match(/query FindRider/)) {
            return Promise.resolve({
                data: { riders: [{ rider_id: 1 }] },
            })
        }
        if (query.match(/mutation RegisterRider/)) {
            return Promise.resolve({
                data: true,
            })
        }
    })

    afterEach(() => {
        fetchQueryMock.mockClear()
    })

    it('calls expected queries', async () => {
        const event: Partial<HandlerEvent> = {
            body: JSON.stringify(registrationData)
        }
        const response = await createRide(event as HandlerEvent)
        expect(response).toMatchObject({
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                response: true,
            }),
        })
        expect(fetchQueryMock).toHaveBeenNthCalledWith(1, expect.stringContaining(registrationData.firstname))
        expect(fetchQueryMock).toHaveBeenNthCalledWith(1, expect.stringContaining(registrationData.lastname))
        expect(fetchQueryMock).toHaveBeenNthCalledWith(2, expect.stringContaining(JSON.stringify({
            ride_event: registrationData.event_id,
            ride_rider: 1,
            ride_hidden: registrationData.hidden,
            ride_startime: registrationData.startime,
        })))
        expect(fetchQueryMock).toHaveBeenNthCalledWith(2, expect.stringContaining(JSON.stringify({
            rider_email: registrationData.email,
            rider_firstname: registrationData.firstname,
            rider_lastname: registrationData.lastname,
            rider_gender: registrationData.gender
        })))
    })

    it('handles errors', async () => {
        fetchQueryMock.mockRejectedValueOnce({ errors: true })
        const event: Partial<HandlerEvent> = {
            body: JSON.stringify(registrationData)
        }
        const response = await createRide(event as HandlerEvent)
        expect(response).toMatchObject({
            statusCode: 500,
        })
    })
})
