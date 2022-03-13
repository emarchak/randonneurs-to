import { HandlerEvent } from '@netlify/functions'
import * as Utils from './utils'
import { createRide } from './rides'

const registrationData = {
    eventId: 10,
    hidden: true,
    email: 'test@email.com',
    firstName: 'Lael',
    lastName: 'Wilcox',
    gender: 'F',
}

describe('createRide', () => {
    const fetchQueryMock = jest.spyOn(Utils, 'fetchQuery')
    fetchQueryMock.mockImplementation((query) => {
        if (query.match(/mutation CreateRider/)) {
            return Promise.resolve({ data: { insert_rider_one: { rider_id: 1 } } })
        }
        if (query.match(/mutation RegisterRider/)) {
            return Promise.resolve({
                data: { response: true },
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

        expect(fetchQueryMock).toHaveBeenNthCalledWith(1, expect.stringContaining(JSON.stringify({
            rider_email: registrationData.email,
            rider_firstname: registrationData.firstName,
            rider_lastname: registrationData.lastName,
            rider_gender: registrationData.gender
        })))
        expect(fetchQueryMock).toHaveBeenNthCalledWith(2, expect.stringContaining(JSON.stringify({
            ride_event: registrationData.eventId,
            ride_rider: 1,
            ride_hidden: registrationData.hidden,
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
