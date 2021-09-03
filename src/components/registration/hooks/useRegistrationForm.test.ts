import { act, renderHook } from "@testing-library/react-hooks"
import { Chapter, RideType } from "src/data/brevets"
import { useRegistrationForm } from "./useRegistrationForm"

const formName = 'registration'
const fieldLabels = {
  name: 'Name',
  email: 'Email',
  route: 'Route'
}
const formData = {
  name: 'Lael',
  email: 'rider@example.com',
  route: '200',
  rideType: 'brevet' as RideType,
  chapter: 'Toronto' as Chapter
}

describe('useRegistrationForm', () => {
  it('sets loading to true on submit', async () => {
    const {result, waitForNextUpdate} = renderHook(() => useRegistrationForm({formName, fieldLabels}))

    expect(result.current.loading).toBeFalsy()

    await act(async () => {
       result.current.onSubmit(formData)
       await waitForNextUpdate()
       expect(result.current.loading).toBeTruthy()
    })

    expect(result.current.loading).toBeFalsy()
  })
})
