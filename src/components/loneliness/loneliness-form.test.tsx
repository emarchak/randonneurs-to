import React from "react"
import { act } from "react-dom/test-utils"
import { render, fireEvent, waitFor } from "@testing-library/react"

import { LonelinessForm } from "./loneliness-form"

const mockFetch = jest.fn().mockReturnValue({ ok: true })

describe("<LonelinessForm>", () => {
  beforeAll(() => {
    global.fetch = mockFetch
  })
  afterEach(() => {
    mockFetch.mockClear()
  })

  it("renders child content", () => {
    const mount = render(<LonelinessForm>{"content"}</LonelinessForm>)

    expect(mount.getByText("content")).toBeTruthy()
  })

  it("requires all fields", async () => {
    const mount = render(<LonelinessForm />)

    expect(mount.getByText("Share your journey")).not.toBeDisabled()

    fireEvent.change(mount.getByLabelText(/name/i), {
      target: { value: "Foo" },
    })

    fireEvent.change(mount.getByLabelText(/email/i), {
      target: { value: "foo@bar.com" },
    })
    fireEvent.click(mount.getByText("Share your journey"))

    expect(mockFetch).not.toHaveBeenCalled()
    expect(mount.getByText("Share your journey")).toBeDisabled()

    fireEvent.change(mount.getByLabelText(/activity/i), {
      target: { value: "https://www.strava.com/activities/123" },
    })
    expect(mount.getByText("Share your journey")).not.toBeDisabled()
    fireEvent.click(mount.getByText("Share your journey"))

    await waitFor(() => expect(mockFetch).toHaveBeenCalled())
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
      expect(mockFetch).toHaveBeenCalled()
      expect(mount.getByText(/Thank you for sharing your journey/)).toBeTruthy()
    })
  })

  it("shows error message if unable to submit", async () => {
    mockFetch.mockRejectedValue({ ok: false });

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
      expect(mockFetch).toHaveBeenCalled()
      expect(mount.getByText(/Server error/)).toBeTruthy()
    })
  })
})
