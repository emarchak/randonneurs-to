import { advanceTo, clear } from 'jest-date-mock'
import { useAllowedStartTimes, addDays } from "./useAllowedStartTimes"

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
        it('allows riders to register before Friday at 6pm ET before scheduled date', () => {
            const { allowedToRegister } = useAllowedStartTimes()

            advanceTo(new Date('Fri April 2 2021 17:59:30 EDT'))
            const rideOnSaturday = new Date('Sat April 3 2021 09:20:00 EDT')
            expect(allowedToRegister(rideOnSaturday)).toBeTruthy()

            advanceTo(new Date('Wed April 7 2021 09:59:30 EDT'))
            const rideNextSaturday = new Date('Sat April 10 2021 09:20:00 EDT')
            expect(allowedToRegister(rideNextSaturday)).toBeTruthy()
        })

        it('stops riders from registering after Friday at 6pm ET before scheduled date', () => {
            const { allowedToRegister } = useAllowedStartTimes()

            advanceTo(new Date('Fri April 2 2021 18:01:30 EDT'))
            const rideOnSaturday = new Date('Sat April 3 2021 09:20:00 EDT')
            expect(allowedToRegister(rideOnSaturday)).toBeFalsy()
        })
    })
})
