const{ getTime, getDate, getControlTime } = require('./date')

describe('getTime()', () => {
    it('formats time', () => {
        expect(getTime(new Date('Sat April 10 2021 09:20:00 EDT')))
            .toEqual('09:20')
    })
})

describe('getDate()', () => {
    it('formats date', () => {
        expect(getDate(new Date('Sat April 10 2021 09:20:00 EDT')))
            .toEqual('Sat April 10 2021')
    })
})

describe('getControlTime()', () => {
    it('formats control times', () => {
        expect(getControlTime(new Date('Sat April 10 2021 09:20:00 EDT')))
            .toEqual('Sat 09:20')
    })
})