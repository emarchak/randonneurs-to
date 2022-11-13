const fetch = require('cross-fetch');
const { getEvent } = require('./getEvent')

describe('getEvent()', () => {
  it('fetches an event based off of schedule id', async () => {
    const event = await getEvent(871)
    expect(event).toMatchObject({
      distance: 300,
      name: 'Kissing Bridge',
      chapter: 'Toronto',
      id: "871",
      rwgpsId: "31557200",
      date: new Date('Sat June 19 2021 06:00 EDT')
    })
  })
})
