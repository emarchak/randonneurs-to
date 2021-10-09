import MockDate from 'mockdate'
import { mockBrevet } from 'src/data/events'
import { getEventOptions } from './getEventOptions'

describe('getEventOptions()', () => {
  it('builds array of event options', () => {
    MockDate.set(new Date(mockBrevet.date))

    const eventOptions = getEventOptions([mockBrevet], null)
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

  it('disables events that are before the opening time', () => {
    const aDayBefore = new Date(mockBrevet.date)
    aDayBefore.setDate(new Date(mockBrevet.date).getDate() - 1)

    const eventOptions = getEventOptions([mockBrevet], aDayBefore)
    expect(eventOptions[1]).toEqual({
      value: expect.stringContaining(`${mockBrevet.distance} - ${mockBrevet.route}`),
      label: expect.stringContaining('screening not open'),
      disabled: true
    })
  })
})
