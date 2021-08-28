import React from 'react'
import MockDate from 'mockdate'
import { fireEvent, render } from "@testing-library/react"
import { TimeField } from "./DateTimeField"

const props = {
  label: 'TimeField',
  name: 'time'
}

describe('<TimeField>', () => {
  const onChangeSpy = jest.fn()

  afterEach(() => {
    onChangeSpy.mockReset()
  })

  it('passes time back to onChange event', () => {
    const mount = render(<TimeField {...props} value={new Date('2021-08-21 06:01 EDT')} onChange={onChangeSpy} />)

    expect(mount.getByLabelText(/time/i)).toHaveProperty('value', '06:00')
    fireEvent.change(mount.getByLabelText(/time/i), {
      target: { value: '12:00' },
    })

    expect(onChangeSpy).toHaveBeenCalledWith(new Date('2021-08-21 12:00'))
  })

  it('uses 06:00 two days from today as default', () => {
    MockDate.set(new Date('2021-08-22 05:01 EDT'))
    const mount = render(<TimeField {...props} value={''} onChange={onChangeSpy} />)

    expect(mount.getByLabelText(/time/i)).toHaveProperty('value', '06:00')
    fireEvent.change(mount.getByLabelText(/time/i), {
      target: { value: '12:00' },
    })

    expect(onChangeSpy).toHaveBeenCalledWith(new Date('2021-08-24 12:00'))
  })
})
