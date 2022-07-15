import { buildCard } from './buildCard'

describe('buildCard()', () => {
  const consoleSpy = jest.spyOn(console, "log")

  beforeAll(() => {
    consoleSpy.mockImplementation()
  })

  afterAll(() => {
    consoleSpy.mockRestore()
  })

  it('builds the default card', async () => {
    const card = await buildCard({ riderNames: ['Erin'], scheduleId: 123 })
    expect(card).toEqual({
      'controllist': [{
        'dist': '0.0km',
        'name': 'CTL START',
        'open': 'O: Sat 06:00',
        'close': 'C: Sat 07:00',
      }, {
        'dist': '160.4km',
        'name': 'CTL MIDDLE',
        'open': 'O: Sat 10:43',
        'close': 'C: Sat 16:41',
      }, {
        'dist': '307.8km',
        'name': 'CTL FINISH',
        'open': 'O: Sat 15:37',
        'close': 'C: Sun 02:00',
      }],
      'distance': 300,
      'emergetel': 'vp@randonneurs.to',
      'evname': 'Kissing Bridge',
      'evstart': 'Sat June 19 2021',
      'maxhours': '20',
      'maxminutes': '00',
      'riderlist': [{ 'fname': 'Erin' }],
    })
  })
  it('allows custom start times', async () => {
    const card = await buildCard({ riderNames: ['Erin'], scheduleId: 123, customStartTime: '08:00' })
    expect(card).toEqual({
      'controllist': [{
        'dist': '0.0km',
        'name': 'CTL START',
        'open': 'O: Sat 08:00',
        'close': 'C: Sat 09:00',
      }, {
        'dist': '160.4km',
        'name': 'CTL MIDDLE',
        'open': 'O: Sat 12:43',
        'close': 'C: Sat 18:41',
      }, {
        'dist': '307.8km',
        'name': 'CTL FINISH',
        'open': 'O: Sat 17:37',
        'close': 'C: Sun 04:00',
      }],
      'distance': 300,
      'emergetel': 'vp@randonneurs.to',
      'evname': 'Kissing Bridge',
      'evstart': 'Sat June 19 2021',
      'maxhours': '20',
      'maxminutes': '00',
      'riderlist': [{ 'fname': 'Erin' }],
    })
  })

  it('allows multiple riders the default card', async () => {
    const card = await buildCard({ riderNames: ['Erin', 'Lael'], scheduleId: 123 })
    expect(card).toEqual({
      'controllist': [{
        'dist': '0.0km',
        'name': 'CTL START',
        'open': 'O: Sat 06:00',
        'close': 'C: Sat 07:00',
      }, {
        'dist': '160.4km',
        'name': 'CTL MIDDLE',
        'open': 'O: Sat 10:43',
        'close': 'C: Sat 16:41',
      }, {
        'dist': '307.8km',
        'name': 'CTL FINISH',
        'open': 'O: Sat 15:37',
        'close': 'C: Sun 02:00',
      }],
      'distance': 300,
      'emergetel': 'vp@randonneurs.to',
      'evname': 'Kissing Bridge',
      'evstart': 'Sat June 19 2021',
      'maxhours': '20',
      'maxminutes': '00',
      'riderlist': [{ 'fname': 'Erin' }, { 'fname': 'Lael' }],
    })
  })

})
