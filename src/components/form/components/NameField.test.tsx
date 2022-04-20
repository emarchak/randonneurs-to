import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { NameField } from './NameField'
import * as useRider from 'src/data/riders'
import { MembershipType } from 'src/graphql.gql'

describe('<NameField>', () => {
  it('warns riders if they are not a member', () => {
    const useRiderSpy = jest.spyOn(useRider, 'useRider')
      // .mockReturnValueOnce({ data: undefined, isLoading: false})
      // .mockReturnValueOnce({ data: { riderName: 'Foo Bar', type: MembershipType.Trial }, isLoading: false })

    const onChangeSpy = jest.fn().mockName('onChange')

    const { getByLabelText, getByText, queryByText } = render(<NameField
      label='name'
      value=''
      onChange={onChangeSpy}
    />)
    expect(useRiderSpy).toHaveBeenCalledTimes(1)

    fireEvent.blur(getByLabelText(/name/i),
      { target: { value: 'Noname Rider' } }
    )
    expect(useRiderSpy).toHaveBeenNthCalledWith(2, { 'riderName': 'Noname Rider' })
    expect(onChangeSpy).toHaveBeenNthCalledWith(2, 'Noname Rider', 'missing')
    expect(getByText(/We can't find your name/)).toBeTruthy()

    fireEvent.blur(getByLabelText(/name/i),
      { target: { value: 'Foo Bar' } }
    )
    expect(useRiderSpy).toHaveBeenNthCalledWith(3, { 'riderName': 'Foo Bar' })
    expect(onChangeSpy).toHaveBeenNthCalledWith(3, 'Foo Bar', 'Individual Membership')
    expect(queryByText(/We can't find your name/)).toBeFalsy()
  })
})
