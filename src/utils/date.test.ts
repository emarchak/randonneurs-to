import { getTime, getDateString, getDateLong, getDateTimeLong, getDateTimeShort } from './date'

describe('getTime()', () => {
    it('formats time', () => {
        expect(getTime(new Date('Sat April 10 2021 09:20:00 EDT')))
            .toEqual('09:20')
    })
})

describe('getDateLong()', () => {
    it('formats date', () => {
        expect(getDateLong(new Date('Sat April 10 2021 09:20:00 EDT')))
            .toEqual('Sat April 10 2021')
    })
})

describe('getDateTimeLong()', () => {
    it('formats date and time', () => {
        expect(getDateTimeLong(new Date('Sat April 10 2021 09:20:00 EDT')))
            .toEqual('Sat April 10 2021 09:20')
    })
})

describe('getDateTimeShort()', () => {
    it('formats date and time', () => {
        expect(getDateTimeShort(new Date('Sat April 10 2021 09:20:00 EDT')))
            .toEqual('Sat April 10 09:20')
    })
})