const{ getControls } = require('./getControls')
global.fetch = jest.requireActual('isomorphic-unfetch')

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
              dist: "0.0 km",
              name: "Start",
              open: "O: Sat 04h59",
              close: "C: Sat 05h59"    
            },
          ])
    })
})
