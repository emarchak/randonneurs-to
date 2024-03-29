import React from "react"
import { render, fireEvent, waitFor } from "@testing-library/react"
import * as isomorphicUnfetch from 'cross-fetch'
import { LonelinessForm } from "./loneliness-form"

jest.mock('cross-fetch', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({ ok: true })
}))

describe("<LonelinessForm>", () => {
  it("renders child content", () => {
    const mount = render(<LonelinessForm>{"content"}</LonelinessForm>)

    expect(mount.getByText("content")).toBeTruthy()
  })

  it("requires all fields", async () => {
    const fetchSpy = jest.spyOn(isomorphicUnfetch, 'default')
    const mount = render(<LonelinessForm />)

    expect(mount.getByText("Share your journey")).not.toBeDisabled()

    fireEvent.change(mount.getByLabelText(/name/i), {
      target: { value: "Foo" },
    })

    fireEvent.change(mount.getByLabelText(/email/i), {
      target: { value: "foo@bar.com" },
    })
    fireEvent.click(mount.getByText("Share your journey"))

    expect(fetchSpy).not.toHaveBeenCalled()
    expect(mount.getByText("Share your journey")).toBeDisabled()

    fireEvent.change(mount.getByLabelText(/activity/i), {
      target: { value: "https://www.strava.com/activities/123" },
    })
    expect(mount.getByText("Share your journey")).not.toBeDisabled()
    fireEvent.click(mount.getByText("Share your journey"))

    await waitFor(() => expect(fetchSpy).toHaveBeenCalled())
  })

  it("rejects incorrect emails", () => {
    const mount = render(<LonelinessForm />)

    fireEvent.change(mount.getByLabelText(/email/i), {
      target: { value: "higgeldy-piggeldy" },
    })
    fireEvent.click(mount.getByText("Share your journey"))

    expect(mount.getByText("Share your journey")).toBeDisabled()

    expect(
      mount.getByText(/higgeldy-piggeldy is not a valid email/i)
    ).toBeTruthy()
  })

  it("rejects incorrect strava urls", () => {
    const mount = render(<LonelinessForm />)

    fireEvent.change(mount.getByLabelText(/strava/i), {
      target: { value: "google.com" },
    })
    fireEvent.click(mount.getByText("Share your journey"))

    expect(mount.getByText("Share your journey")).toBeDisabled()

    expect(mount.getByText(/google.com is not a valid strava/i)).toBeTruthy()
  })

  it("shows confirmation on submit", async () => {
    const fetchSpy = jest.spyOn(isomorphicUnfetch, 'default')
    const mount = render(<LonelinessForm />)

    expect(mount.getByText("Share your journey")).not.toBeDisabled()

    fireEvent.change(mount.getByLabelText(/name/i), {
      target: { value: "Foo" },
    })

    fireEvent.change(mount.getByLabelText(/email/i), {
      target: { value: "foo@bar.com" },
    })

    fireEvent.change(mount.getByLabelText(/activity/i), {
      target: { value: "https://www.strava.com/activities/123" },
    })

    expect(mount.getByText("Share your journey")).not.toBeDisabled()
    fireEvent.click(mount.getByText("Share your journey"))

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalled()
      expect(mount.getByText(/Thank you for sharing your journey/)).toBeTruthy()
    })
  })

  it("shows error message if unable to submit", async () => {
    const fetchSpy = jest.spyOn(isomorphicUnfetch, 'default')
    fetchSpy.mockRejectedValue({ ok: false })

    const mount = render(<LonelinessForm />)

    expect(mount.getByText("Share your journey")).not.toBeDisabled()

    fireEvent.change(mount.getByLabelText(/name/i), {
      target: { value: "Foo" },
    })

    fireEvent.change(mount.getByLabelText(/email/i), {
      target: { value: "foo@bar.com" },
    })

    fireEvent.change(mount.getByLabelText(/activity/i), {
      target: { value: "https://www.strava.com/activities/123" },
    })

    expect(mount.getByText("Share your journey")).not.toBeDisabled()
    fireEvent.click(mount.getByText("Share your journey"))

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalled()
      expect(mount.getByText(/Server error/)).toBeTruthy()
    })
  })
})
