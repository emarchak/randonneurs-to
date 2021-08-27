import { advanceTo } from 'jest-date-mock'
import { mockBrevet } from 'src/data/brevets'
import { getEventOptions } from './getEventOptions'

describe('getEventOptions()', () => {
  it('builds array of event options', () => {
    advanceTo(mockBrevet.date)

    const eventOptions = getEventOptions([mockBrevet])
    expect(eventOptions[0]).toEqual({
      'label': 'Scheduled permanent',
      'value': 'permanent',
    })
    expect(eventOptions[1]).toEqual({
      value: expect.stringContaining(`${mockBrevet.distance} - ${mockBrevet.route}`),
      label: expect.stringContaining(mockBrevet.route),
      disabled: false
    })
  })

  it('disables events that are more than 2 days in the future', () => {
    const newBrevetDate = new Date(mockBrevet.date).setDate(new Date(mockBrevet.date).getDate() - 4)
    advanceTo(newBrevetDate)
    const eventOptions = getEventOptions([mockBrevet])
    expect(eventOptions[1]).toEqual({
      value: expect.stringContaining(`${mockBrevet.distance} - ${mockBrevet.route}`),
      label: expect.stringContaining('screening not open'),
      disabled: true
    })
  })
})
