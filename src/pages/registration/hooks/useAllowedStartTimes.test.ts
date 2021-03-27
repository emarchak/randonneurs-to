import { advanceTo, clear } from 'jest-date-mock'
import { useAllowedStartTimes, addDays } from "./useAllowedStartTimes"

describe('useAllowedStartTimes', () => {
    beforeEach(() => {
        advanceTo(new Date('August 18 2019'))
    })

    afterEach(() => {
        clear()
    })

    it('requires the start date to be a day in the future for unscheduled events', () => {
        const { allowedStartTimes, } = useAllowedStartTimes()

        expect(allowedStartTimes(addDays(0))).toBeFalsy()
        expect(allowedStartTimes(addDays(1))).toBeTruthy()
    })

    it('requires start date to be on scheduled date', () => {
        const { allowedStartTimes } = useAllowedStartTimes()
        const notAllowed = addDays(2)

        expect(allowedStartTimes(addDays(2), notAllowed)).toBeFalsy()
        expect(allowedStartTimes(addDays(7), notAllowed)).toBeFalsy()

        const allowed = addDays(8)
        expect(allowedStartTimes(addDays(7), allowed)).toBeFalsy()
        expect(allowedStartTimes(addDays(9), allowed)).toBeFalsy()
        expect(allowedStartTimes(addDays(8), allowed)).toBeTruthy()
    })

    it('allows riders to register up to three days before scheduled date', () => {
        const { allowedToRegister } = useAllowedStartTimes()

        const allowed = addDays(8)
        expect(allowedToRegister(allowed)).toBeTruthy()

        const notAllowed = addDays(2)
        expect(allowedToRegister(notAllowed)).toBeFalsy()
    })
})
