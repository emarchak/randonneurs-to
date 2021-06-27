const { getControls } = require('./getControls')

const event = {
    distance: 300,
    name: 'Kissing Bridge',
    chapter: 'Toronto',
    id: 123,
    rwgpsId: 31557200,
    date: new Date('Sat June 19 2021 04:59 EDT')
}

describe('getControls()', () => {
    it('gets the controls', async () => {
        const controls = await getControls({event})
        expect(controls).toEqual([    
            {       
              "dist": "0.0km",
              "name": "CTL START",
              "open": "O: Sat 04:59",
              "close": "C: Sat 05:59",
            },{
              'dist': '160.4km',
              'name': 'CTL MIDDLE',
              'open': 'O: Sat 09:42',
              'close': 'C: Sat 15:40',
            },{
              "dist": "307.8km",
              "name": "CTL FINISH",
              "open": "O: Sat 14:36",
              "close": "C: Sun 00:59",
            },
          ])
    })
})
