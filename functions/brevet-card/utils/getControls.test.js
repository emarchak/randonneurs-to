const { getControls } = require('./getControls')

const event = {
  distance: 300,
  name: 'Kissing Bridge',
  chapter: 'Toronto',
  id: 123,
  rwgpsId: 31557200,
  date: new Date('Sat June 19 2021 05:00 EDT')
}

describe('getControls()', () => {
  const consoleSpy = jest.spyOn(console, "log")

  beforeAll(() => {
    consoleSpy.mockImplementation()
  })

  afterAll(() => {
    consoleSpy.mockRestore()
  })

  it('gets the controls', async () => {
    const controls = await getControls({event})
    expect(controls).toEqual([
      {
        "dist": "0.0km",
        "name": "CTL START",
        "open": "O: Sat 05:00",
        "close": "C: Sat 06:00",
      },{
        'dist': '160.4km',
        'name': 'CTL MIDDLE',
        'open': 'O: Sat 09:43',
        'close': 'C: Sat 15:41',
      },{
        "dist": "307.8km",
        "name": "CTL FINISH",
        "open": "O: Sat 14:37",
        "close": "C: Sun 01:00",
      },
    ])
  })

  it('throws error when route not found', async () => {
    await expect(
      getControls({event: {...event, rwgpsId: null}})
    ).rejects.toThrow('Unable to find route null');

  })
})
