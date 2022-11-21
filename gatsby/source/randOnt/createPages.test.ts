import { createPages } from './createPages'
import * as FS from 'fs'
import * as ICS from 'ics'

const mockEvents = [
  {
    chapter: 'Toronto',
    distance: 200,
    event: 'brevet',
    id: 1,
    route: 'Waterfront East',
    rwgpsUrl: 'https://ridewithgps.com/routes/20784084',
    startLocation: 'Rouge GO',
    date: 'August 7 2020 08:00 EDT',
    season: '2020',
    path: '/event/2021/waterfront-east-august-7-2020-08-00-edt'
  },
  {
    chapter: 'Huron',
    distance: 600,
    eventType: 'brevet',
    id: 2,
    route: 'Brouse\'s Beach Browser',
    rwgpsUrl: 'https://ridewithgps.com/routes/27865209',
    startLocation: 'Goderich, Ontario',
    date: 'August 14 2021 08:00 EDT',
    season: '2021',
    path: '/event/2021/brouses-beach-browser-august-14-2021-0800-edt'
  }
]

describe('createPages', () => {
  const existsMock = jest.spyOn(FS, 'existsSync')
  const mkdirMock = jest.spyOn(FS, 'mkdirSync')
  const writeFileMock = jest.spyOn(FS, 'writeFileSync')
  const icsSpy = jest.spyOn(ICS, 'createEvents')
  const graphql = jest.fn()

  beforeEach(() => {
    existsMock.mockReturnValue(false)
    mkdirMock.mockReturnValue('')
    writeFileMock.mockImplementation(jest.fn())
  })

  afterEach(() => {
    existsMock.mockClear()
    mkdirMock.mockClear()
    writeFileMock.mockClear()
    graphql.mockClear()
    icsSpy.mockClear()
  })
  it('returns null if no data is returned', async () => {
    graphql.mockReturnValue({ data: null })
    await createPages({ graphql } as any, {} as any, jest.fn())

    expect(icsSpy).not.toHaveBeenCalled()
    expect(writeFileMock).not.toHaveBeenCalled()
  })

  it('should create a calendar file for each season', async () => {
    graphql.mockReturnValue({
      data: {
        allEvent: {
          nodes: mockEvents
        }
      }
    })

    await createPages({ graphql } as any, {} as any, jest.fn())

    expect(icsSpy).toHaveBeenNthCalledWith(2, [expect.objectContaining({
      description: `Brouse's Beach Browser - 600km
  Start location: Goderich, Ontario
  Start time: Sat August 14 2021 08:00
  Brevet time limit: 40 hours, 0 minutes
  Chapter: Huron
  Visit https://randoneurs.to/event/2021/brouses-beach-browser-august-14-2021-0800-edt for more information.\n`,
      duration: { "hours": 40, "minutes": 0 },
      location: "Goderich, Ontario",
      start: [2021, 8, 14, 12, 0],
      title: "Brouse's Beach Browser 600km brevet",
      url: "https://randoneurs.to/event/2021/brouses-beach-browser-august-14-2021-0800-edt"
    })])
  })


  it('should provide default time to weird distance values', async () => {
    graphql.mockReturnValue({
      data: {
        allEvent: {
          nodes: [{
            ...mockEvents[0],
            distance: 96,
          }]
        }
      }
    })

    await createPages({ graphql } as any, {} as any, jest.fn())

    expect(icsSpy).toHaveBeenCalledWith([expect.objectContaining({
      duration: { "hours": 6, "minutes": 0 },
    })])
  })
})
