import { advanceTo, clear } from 'jest-date-mock'
import { useAllowedStartTimes } from "./useAllowedStartTimes"

const daysFromToday = (number: number) => {
    const today = new Date(Date.now())
    return new Date(today.setDate(today.getDate() + number))
}

describe('useAllowedStartTimes', () => {
    beforeEach(() => {
        advanceTo(new Date('August 18 2019'))
    })

    afterEach(() => {
        clear()
    })

    it('requires the start date to be > 2 weeks in the future for unscheduled events', () => {
        const { allowedStartTimes } = useAllowedStartTimes()

        expect(allowedStartTimes(daysFromToday(8))).toBeFalsy()
        expect(allowedStartTimes(daysFromToday(14))).toBeTruthy()
    })

    it('requires start date to be on scheduled date', () => {
        const { allowedStartTimes } = useAllowedStartTimes()
        const notAllowed = daysFromToday(2)

        expect(allowedStartTimes(daysFromToday(2), notAllowed)).toBeFalsy()
        expect(allowedStartTimes(daysFromToday(7), notAllowed)).toBeFalsy()

        const allowed = daysFromToday(8)
        expect(allowedStartTimes(daysFromToday(7), allowed)).toBeFalsy()
        expect(allowedStartTimes(daysFromToday(9), allowed)).toBeFalsy()
        expect(allowedStartTimes(daysFromToday(8), allowed)).toBeTruthy()
    })

    it('allows riders to register up to three days before scheduled date', () => {
        const { allowedToRegister } = useAllowedStartTimes()

        const allowed = daysFromToday(8)
        expect(allowedToRegister(allowed)).toBeTruthy()

        const notAllowed = daysFromToday(2)
        expect(allowedToRegister(notAllowed)).toBeFalsy()
    })
})
