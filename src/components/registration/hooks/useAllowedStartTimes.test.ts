import { useAllowedStartTimes } from "./useAllowedStartTimes"

const today = new Date('August 18 2019')
const daysFromToday = (number: number) => new Date(new Date(today).setDate(today.getDate() + number))

describe('useAllowedStartTimes', () => {
    const { allowedStartTimes } = useAllowedStartTimes(today)

    it('requires the start date to be > 2 weeks in the future for unscheduled events', () => {
        expect(allowedStartTimes(daysFromToday(8))).toBeFalsy()
        expect(allowedStartTimes(daysFromToday(14))).toBeTruthy()
    })

    it('requires start date to be on scheduled date', () => {
        const notAllowed = daysFromToday(2)

        expect(allowedStartTimes(daysFromToday(2), notAllowed)).toBeFalsy()
        expect(allowedStartTimes(daysFromToday(7), notAllowed)).toBeFalsy()

        const allowed = daysFromToday(8)
        expect(allowedStartTimes(daysFromToday(7), allowed)).toBeFalsy()
        expect(allowedStartTimes(daysFromToday(9), allowed)).toBeFalsy()
        expect(allowedStartTimes(daysFromToday(8), allowed)).toBeTruthy()
    })
})
