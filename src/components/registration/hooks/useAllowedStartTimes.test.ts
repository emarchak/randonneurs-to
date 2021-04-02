import { advanceTo, clear } from 'jest-date-mock'
import { Brevet } from '../../../hooks/useBrevets'
import { useAllowedStartTimes } from "./useAllowedStartTimes"

const brevet: Brevet = {
    chapter: 'Toronto',
    event: 'brevet',
    distance: 200,
    date: new Date('Sat April 3 2021 09:20:00 EDT'),
    route: 'Gentle Start 60',
    startLocation: 'Second Cup, 355 Danforth Ave, Toronto',
    id: '1',
    rwgpsUrl: 'https://rwgps.com',
    rwgpsId: 1,
    organizer: 'Erin',
    season: 2021
}

describe('useAllowedStartTimes', () => {
    afterEach(() => {
        clear()
    })

    describe('allowedStartTimes()', () => {
        it('requires the start date to be a day in the future for unscheduled events', () => {
            advanceTo(new Date('August 18 2021'))
            const { allowedStartTimes } = useAllowedStartTimes()

            expect(allowedStartTimes(new Date('August 18 2021'))).toBeFalsy()
            expect(allowedStartTimes(new Date('August 19 2021'))).toBeTruthy()
        })

        it('requires start date to be on scheduled date', () => {
            advanceTo(new Date('August 1 2021'))

            const { allowedStartTimes } = useAllowedStartTimes()

            const scheduledDate = new Date('August 20 2021')
            expect(allowedStartTimes(new Date('August 17 2021'), scheduledDate)).toBeFalsy()
            expect(allowedStartTimes(new Date('August 19 2021'), scheduledDate)).toBeFalsy()
            expect(allowedStartTimes(new Date('August 26 2021'), scheduledDate)).toBeFalsy()
            expect(allowedStartTimes(new Date('August 20 2021'), scheduledDate)).toBeTruthy()
        })
    })

    describe('allowedToRegister()', () => {
        const ottawaBrevet: Brevet = { ...brevet, chapter: 'Ottawa' }

        it('allows riders to register three days before scheduled date', () => {
            const { allowedToRegister } = useAllowedStartTimes()

            advanceTo(new Date('Wed April 7 2021 19:59:30 EDT'))
            const rideOnSaturday = new Date('Sat April 10 2021 09:20:00 EDT')
            expect(allowedToRegister({ ...brevet, date: rideOnSaturday })).toBeTruthy()

            advanceTo(new Date('Thu April 8 2021 19:59:30 EDT'))
            expect(allowedToRegister({ ...brevet, date: rideOnSaturday })).toBeFalsy()

            const rideNextSaturday = new Date('Sat April 17 2021 09:20:00 EDT')
            expect(allowedToRegister({ ...brevet, date: rideNextSaturday })).toBeTruthy()
        })

        it('allows Ottawa riders to register before Friday at 6pm ET before scheduled date', () => {
            const { allowedToRegister } = useAllowedStartTimes()

            advanceTo(new Date('Fri April 2 2021 17:59:30 EDT'))
            const rideOnSaturday = new Date('Sat April 3 2021 09:20:00 EDT')
            expect(allowedToRegister({ ...ottawaBrevet, date: rideOnSaturday })).toBeTruthy()

            advanceTo(new Date('Fri April 2 2021 18:01:30 EDT'))
            expect(allowedToRegister({ ...ottawaBrevet, date: rideOnSaturday })).toBeFalsy()

            advanceTo(new Date('Wed April 7 2021 09:59:30 EDT'))
            const rideNextSaturday = new Date('Sat April 10 2021 09:20:00 EDT')
            expect(allowedToRegister({ ...ottawaBrevet, date: rideNextSaturday })).toBeTruthy()
        })
    })
})
