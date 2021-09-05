const { handler: sheets } = require('./sheets')
const sheetAPI = require('google-spreadsheet')

const rowToAdd = {
  sheet: 'registration',
  row: {
    submitted: 'today',
    chapter: 'Toronto',
    distance: '400',
    route: 'Test route',
    startDate: 'Today',
    startTime: '05:00',
    scheduleTime: '05:00',
    startLocation: 'Start location',
    name: 'Test rider',
    email: 'test@example.com',
    gender: 'F',
    membership: 'Missing',
    notes: 'This is a test registration'
  }
}

jest.mock('google-spreadsheet', () => ({
  GoogleSpreadsheet: jest.fn(),
}))

jest.mock('./sheetData', () => {
  const sheetData = jest.requireActual('./sheetData')
  return ({
    ...sheetData,
    registration: {
      ...sheetData.registration,
      id: 'registrationSheetID'
    }
  })
})

describe('sheets()', () => {
  const sheetSpy = jest.spyOn(sheetAPI, 'GoogleSpreadsheet')
  const addRowSpy = jest.fn().mockReturnValue({rowIndex: 202})

  sheetSpy.mockReturnValue({
    useServiceAccountAuth: jest.fn(),
    loadInfo: jest.fn(),
    sheetsByTitle: {
      Registrations: {
        addRow: addRowSpy
      }
    }
  })

  afterEach(() => {
    sheetSpy.mockRestore()
    addRowSpy.mockRestore()
  })

  it('should add correctly formatted row to sheet', async () => {
    const response = await sheets({body: JSON.stringify(rowToAdd)});

    expect(response.statusCode).toEqual(200)
    expect(sheetSpy).toHaveBeenCalledWith('registrationSheetID')
    expect(addRowSpy).toHaveBeenCalledWith([
      'today',
      'Toronto',
      '400',
      'Test route',
      'Today',
      '05:00',
      '05:00',
      'Start location',
      'Test rider',
      'test@example.com',
      '',
      'Missing',
      'F',
      'This is a test registration'
    ])
  })

  it('should return error if sheet does not exist', async () => {
    const response = await sheets({body: JSON.stringify({
        ...rowToAdd,
        sheet:'fake'
      })});

    expect(response.statusCode).toEqual(500)
  })
})
