import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { RegistrationFormPermanent } from './registration-form-permanent'
import * as isomorphicUnfetch from 'isomorphic-unfetch'
import * as useRiders from 'src/data/riders'
import * as useMail from 'src/data/mail'
import * as useSlack from 'src/hooks/useSlack'
import * as Gatsby from 'gatsby'

const db =  {
  routes: [
    {
      id: 'route1',
      chapter: 'Toronto',
      distance: 200,
      startLocation: 'Starbucks',
      name: 'Urban'
    },
    {
      id: 'route2',
      chapter: 'Huron',
      distance: 300,
      startLocation: 'Careys House',
      name: 'Golf'
    },
    {
      id: 'route3',
      chapter: 'Simcoe',
      distance: 90,
      startLocation: 'Tims',
      name: 'Shortest ride'
    },
    {
      id: 'route4',
      chapter: 'Ottawa',
      distance: 170,
      startLocation: 'Tims',
      name: 'Shorter ride'
    }
  ]
}

jest.mock('src/data/riders', () => ({
  __esModule: true,
  useRiders: jest.fn().mockReturnValue({
    checkMembership: jest.fn().mockImplementation((fullName) => ({
      fullName,
      city: 'Toronto',
      country: 'Canada',
      seasons: [2021],
      membership: 'Individual',
    }))
  })
}))

describe('<RegistrationFormPermanent>', () => {
  beforeAll(() => {
    const staticQuerySpy = jest.spyOn(Gatsby, 'useStaticQuery')
    staticQuerySpy.mockReturnValue({db})
  });

  it('renders all the required fields to the user', () => {
    const mount = render(<RegistrationFormPermanent />)
    expect(() => {
      fireEvent.change(mount.getByLabelText(/name/i), {
        target: { value: 'Foo' },
      })
      fireEvent.change(mount.getByLabelText(/email/i), {
        target: { value: 'foo@bar.com' },
      })

      expect(mount.baseElement).toHaveTextContent(/Urban/i)
      expect(mount.baseElement).toHaveTextContent(/Golf/i)

      fireEvent.click(mount.getByLabelText(/Urban/i))

      fireEvent.change(mount.getByLabelText(/starting time date/i), {
        target: { value: new Date() },
      })
      fireEvent.change(mount.getByLabelText(/notes/i), {
        target: { value: 'notes' },
      })
    }).not.toThrow()
  })

  it('requires email, rider name, randonneurs ontario consent and oca consent', () => {
    const mount = render(<RegistrationFormPermanent />)

    fireEvent.change(mount.getByLabelText(/email/i), {
      target: { value: 'higgeldy-piggeldy' },
    })

    fireEvent.click(mount.getByText('Register'))

    expect(mount.getByText('Register')).toBeDisabled()

    expect(
      mount.getByText(/name is required/i)
    ).toBeTruthy()

    expect(
      mount.getByText(/higgeldy-piggeldy is not a valid email/i)
    ).toBeTruthy()

    expect(
      mount.getByText(/OCA risk awareness is required/i)
    ).toBeTruthy()

    expect(
      mount.getByText(/Randonneurs Ontario risk policy is required/i)
    ).toBeTruthy()
  })

  it('records the registration when submitted', async () => {
    const fetchSpy = jest.spyOn(isomorphicUnfetch, 'default')
    const mount = render(<RegistrationFormPermanent />)
    const rideDate = new Date('2021-10-09T12:00:00.000Z')

    const useMailMock = jest.spyOn(useMail, 'useMail')
    const sendMailSpy = jest.fn().mockName('sendMail').mockReturnValue(true)
    useMailMock.mockReturnValue({ sendMail: sendMailSpy })

    const useSlacklMock = jest.spyOn(useSlack, 'useSlack')
    const sendSlackMsgSpy = jest.fn().mockName('sendSlackMsg').mockReturnValue(true)
    useSlacklMock.mockReturnValue({ sendSlackMsg: sendSlackMsgSpy })

    fireEvent.change(mount.getByLabelText(/name/i), {
      target: { value: 'Foo Bar' },
    })
    fireEvent.blur(mount.getByLabelText(/name/i), {
      target: { value: 'Foo Bar' }
    })

    fireEvent.change(mount.getByLabelText(/email/i), {
      target: { value: 'foo@bar.com' },
    })

    fireEvent.click(mount.getByLabelText(/Urban/i))

    fireEvent.change(mount.getByLabelText(/starting time date/i), {
      target: { value: rideDate },
    })

    fireEvent.change(mount.getByLabelText(/time select/i), {
      target: { value: '12:00' },
    })

    fireEvent.click(mount.getByLabelText(/I have read Randonneurs Ontario's Club Risk Management Policy/i))
    fireEvent.click(mount.getByLabelText(/I have read the Ontario Cycling Association's Progressive Return to Cycling/i))

    fireEvent.change(mount.getByLabelText(/notes/i), {
      target: { value: 'notes' },
    })

    fireEvent.click(mount.getByText('Register'))

    await waitFor(() => {
      expect(sendMailSpy).toHaveBeenCalled()
      expect(sendSlackMsgSpy).toHaveBeenCalled()
      expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/sheets', expect.objectContaining({
        body: JSON.stringify({
          sheet: 'registration-permanent',
          row: {
            name: 'Foo Bar',
            email: 'foo@bar.com',
            membership: 'Individual',
            route: 'Urban',
            startTime: '08:00',
            startLocation: 'Starbucks',
            chapter: 'Toronto',
            distance: 200,
            notes: 'notes',
            ocaConsent: 'Yes',
            roConsent: 'Yes',
            rideType: 'permanent',
            submitted: 'Thu December 31 2020 19:00',
            startDate: 'Sat October 9'
          }
        }),
        method: 'POST'
      }))

      expect(mount.getByText(/Thank you for registering to ride/)).toBeTruthy()
    })
  })

  it('shows an error when unable to submit', async () => {
    const fetchSpy = jest.spyOn(isomorphicUnfetch, 'default')
    fetchSpy.mockRejectedValue(new Error('nope'))

    const mount = render(<RegistrationFormPermanent />)
    fireEvent.change(mount.getByLabelText(/name/i), {
      target: { value: 'Foo Bar' },
    })

    fireEvent.change(mount.getByLabelText(/email/i), {
      target: { value: 'foo@bar.com' },
    })

    fireEvent.click(mount.getByLabelText(/Urban/i))

    fireEvent.change(mount.getByLabelText(/starting time date/i), {
      target: { value: new Date() },
    })

    fireEvent.change(mount.getByLabelText(/time select/i), {
      target: { value: '12:00' },
    })

    fireEvent.change(mount.getByLabelText(/starting location/i), {
      target: { value: 'Starbucks' },
    })

    fireEvent.click(mount.getByLabelText(/I have read Randonneurs Ontario's Club Risk Management Policy/i))
    fireEvent.click(mount.getByLabelText(/I have read the Ontario Cycling Association's Progressive Return to Cycling/i))

    fireEvent.change(mount.getByLabelText(/notes/i), {
      target: { value: 'notes' },
    })

    fireEvent.click(mount.getByRole('button', {name: 'Register'}))

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalled()
      expect(mount.getByText(/Server error! Try again later/)).toBeTruthy()
    })

    fetchSpy.mockClear()
  })

  it('warns riders if they are not a member', () => {
    const checkMembershipMock = jest.fn()
      .mockReturnValueOnce(null)
      .mockReturnValueOnce({ membership: 'Trial' })
    const useCheckRiderMembershipSpy = jest.spyOn(useRiders, 'useRiders')
    useCheckRiderMembershipSpy.mockReturnValue({ checkMembership: checkMembershipMock })

    const mount = render(<RegistrationFormPermanent />)

    fireEvent.blur(mount.getByLabelText(/name/i),
      { target: { value: 'Foo Bar' } }
    )
    expect(checkMembershipMock).toHaveBeenCalledTimes(1)
    expect(checkMembershipMock).toHaveBeenCalledWith({ 'fullName': 'Foo Bar' })
    expect(mount.getByText(/We can't find your name/)).toBeTruthy()

    fireEvent.blur(mount.getByLabelText(/name/i))
    expect(checkMembershipMock).toHaveBeenCalledTimes(2)
    expect(mount.queryByText(/We can't find your name/)).toBeFalsy()

    useCheckRiderMembershipSpy.mockClear()
  })

  it('filters routes less than 100km', () => {
    const mount = render(<RegistrationFormPermanent />)
    const DistanceSelector = mount.getByLabelText(/distance/i)

    expect(DistanceSelector).toHaveTextContent(/< 100/i)
    expect(DistanceSelector).toHaveTextContent(/100 - 199/i)
    expect(DistanceSelector).toHaveTextContent(/200/i)
    expect(DistanceSelector).toHaveTextContent(/300/i)

    expect(mount.baseElement).toHaveTextContent(/Urban/i)
    expect(mount.baseElement).toHaveTextContent(/Golf/i)
    expect(mount.baseElement).toHaveTextContent(/Shorter/i)
    expect(mount.baseElement).toHaveTextContent(/Shortest/i)

    fireEvent.change(DistanceSelector, {
      target: { value: '< 100' }
    })

    expect(mount.baseElement).not.toHaveTextContent(/Urban/i)
    expect(mount.baseElement).not.toHaveTextContent(/Golf/i)
    expect(mount.baseElement).not.toHaveTextContent(/Shorter/i)
    expect(mount.baseElement).toHaveTextContent(/Shortest/i)
  })
})
