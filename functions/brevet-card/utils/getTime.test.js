const { getTimeLimit, getOpenTime, getCloseTime } = require('./getTime')


const startTime = new Date('June 6 06:00')
const eventDistance = 1300
const args = {startTime, eventDistance}

describe('getTimeLimit()', () => {
    it('returns 13h30m for 200 brevets', () => {
        expect(getTimeLimit(200)).toStrictEqual({h: 13, m: 30})
    })
    it('returns 20h0m for 300 brevets', () => {
        expect(getTimeLimit(300)).toStrictEqual({h: 20, m: 0})
    })
})

describe('getCloseTime()', () => {
    it('uses 15km/h for controls < 600 from the start', () => {
        expect(getCloseTime({...args, controlDistance: 98})).toBe('')
    })

    it('uses 11.428km/h for controls 600 - 1000 from the start', () => {
        expect(getCloseTime({...args, controlDistance: 650})).toBe('')
    })

    it('uses 13.333km/h for controls > 1000  from the start', () => {
        expect(getCloseTime({...args, controlDistance: 1098})).toBe('')
    })

    it('uses time limit for controls past the event distance', () => {
        expect(getCloseTime({...args, eventDistance: 200, controlDistance: 201})).toBe('')
    })
})
describe('getOpenTime()', () => {
    it('uses 34km/h for controls < 200 from the start', () => {
        expect(getOpenTime({...args, controlDistance: 98})).toBe('')
    })

    it('uses 32km/h for controls 200 - 400 from the start', () => {
        expect(getOpenTime({...args, controlDistance: 298})).toBe('')
    })

    it('uses 30km/h for controls 400-600 from the start', () => {
        expect(getOpenTime({...args, controlDistance: 598})).toBe('')
    })

    it('uses 28km/h for controls 600-1000 from the start', () => {
        expect(getOpenTime({...args, controlDistance: 978})).toBe('')
    })
    it('uses 26km/h for controls > 1000 from the start', () => {
        expect(getOpenTime({...args, controlDistance: 1098})).toBe('')
    })
})