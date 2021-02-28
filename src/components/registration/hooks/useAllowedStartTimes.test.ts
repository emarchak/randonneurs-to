import { useAllowedStartTimes } from "./useAllowedStartTimes"

describe('useAllowedStartTimes', () => {
    const today = new Date('August 18 2019')
    const { allowedStartTimes } = useAllowedStartTimes(today)

    it('requires the start date to be > 1 week in the future', () => {
        expect(allowedStartTimes(new Date('August 11 2019'))).toBeFalsy()
        expect(allowedStartTimes(new Date('August 26 2019'))).toBeTruthy()
    })

    it('requires start date to be within -2 / +1 weeks from scheduled date', () => {
        const scheduledDate = new Date('October 1 2019')

        expect(allowedStartTimes(new Date('September 14 2019'), scheduledDate)).toBeFalsy()
        expect(allowedStartTimes(new Date('September 17 2019'), scheduledDate)).toBeTruthy()

        expect(allowedStartTimes(new Date('October 31 2019'), scheduledDate)).toBeFalsy()
        expect(allowedStartTimes(new Date('October 8 2019'), scheduledDate)).toBeTruthy()
    })

    it('requires start date to be > 1 week in the future and +1 week from scheduled date', () => {
        const scheduledDate = new Date('August 20 2019')

        expect(allowedStartTimes(new Date('August 21 2019'), scheduledDate)).toBeFalsy()
        expect(allowedStartTimes(new Date('August 27 2019'), scheduledDate)).toBeTruthy()
        expect(allowedStartTimes(new Date('October 1 2019'), scheduledDate)).toBeFalsy()
    })
})
