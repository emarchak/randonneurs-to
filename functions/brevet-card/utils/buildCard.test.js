const { buildCard } = require('./buildCard')

jest.mock('./getEvent', () => ({
    getEvent: () => ({
        distance: 300,
        name: 'Kissing Bridge',
        chapter: 'Toronto',
        id: 123,
        rwgpsId: 31557200,
        date: new Date('Sat June 19 2021 04:59 EDT')
    })
}))

describe('buildCard()', () => {
    const mockFetch = jest.fn().mockReturnValue({
      ok: true,
      status: 200, 
      json: jest.fn().mockResolvedValue({route: {course_points: []}})
    });
  
    beforeAll(() => {
      global.fetch = mockFetch;
    });
  
    afterEach(() => {
      mockFetch.mockReset();
    });

    it('builds the default card', async () => {
        const card = await buildCard({riderName: 'Erin', scheduleId: 123})
        expect(card).toEqual({
            'controllist': [{
                'dist': '0.0 km',
                'name': 'Start',
                'open': 'O: Sat 04h59',
                'close': 'C: Sat 05h59',
            }],
            'distance': 300,
            'emergetel': 'vp@randonneurs.to',
            'evname': 'Kissing Bridge',
            'evstart': 'Sat June 19 2021',
            'maxhours': '20',
            'maxminutes': '00',
            'riderlist': [ {'fname': 'Erin'}],
        })
    })
})
