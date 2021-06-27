const { getTimeLimit, getOpenTime, getCloseTime } = require('./getTime')


const startTime = new Date('June 6 2021 06:00')
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
        const closeTime = getCloseTime({...args, controlDistance: 98})
        expect(closeTime.toString()).toMatch(/Jun 06 2021 12:32/)
    })
    it('uses 11.428km/h for controls 600 - 1000 from the start', () => {
        const closeTime = getCloseTime({...args, controlDistance: 650})
        expect(closeTime.toString()).toMatch(/Jun 08 2021 14:52/)
    })
    it('uses 13.333km/h for controls > 1000 from the start', () => {
        const closeTime = getCloseTime({...args, controlDistance: 1098})
        expect(closeTime.toString()).toMatch(/Jun 09 2021 16:21/)
    })
    it('uses time limit for controls past the event distance', () => {
        const closeTime = getCloseTime({...args, eventDistance: 200, controlDistance: 201})
        expect(closeTime.toString()).toMatch(/Jun 06 2021 19:30/)
    })
    it('uses French variation for controls < 60km from the start', () => {
      const closeTime = getCloseTime({...args, controlDistance: 58})
      expect(closeTime.toString()).toMatch(/Jun 06 2021 09:54/)
  })
})
describe('getOpenTime()', () => {
    it('uses start time for controls < 1 from start', ()=> {
        const openTime = getOpenTime({...args, controlDistance: .7})
        expect(openTime.toString()).toMatch(/Jun 06 2021 06:00/)
    })
    it('uses 34km/h for controls < 200 from the start', () => {
        const openTime = getOpenTime({...args, controlDistance: 199})
        expect(openTime.toString()).toMatch(/Jun 06 2021 11:51/)
    })
    it('uses 32km/h for controls 200 - 400 from the start', () => {
        const openTime = getOpenTime({...args, controlDistance: 201})
        expect(openTime.toString()).toMatch(/Jun 06 2021 12:16/)
    })
    it('uses 30km/h for controls 400-600 from the start', () => {
        const openTime = getOpenTime({...args, controlDistance: 501})
        expect(openTime.toString()).toMatch(/Jun 06 2021 22:42/)
    })
    it('uses 28km/h for controls 600-1000 from the start', () => {
        const openTime = getOpenTime({...args, controlDistance: 701})
        expect(openTime.toString()).toMatch(/Jun 07 2021 07:02/)
    })
    it('uses 26km/h for controls > 1000 from the start', () => {
        const openTime = getOpenTime({...args, controlDistance: 1001})
        expect(openTime.toString()).toMatch(/Jun 07 2021 20:30/)
    })
})
