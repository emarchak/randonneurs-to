import React, { useState } from "react"

const formName = "clubaudaxadistance"

const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const stravaRegex = /^((?:https?:)?\/\/)?((?:www)\.)?((?:strava\.com))(\/activities\/)([\d\-]+)?$/

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const checkForErrors = (fields: FormData) =>
  Object.entries(fields)
    .map(([field, value]) => {
      if (!value.length) {
        return `${field} field is required`
      }

      if (field === "email" && !emailRegex.test(value)) {
        return `${value} is not a valid email`
      }

      if (field === "strava" && !stravaRegex.test(value)) {
        return `${value} is not a valid strava activity url. It should be in the format https://www.strava.com/activities/11111111`
      }
    })
    .filter(Boolean)

type FormData = {
  name: string
  email: string
  strava: string
}

type FormState = "submitted" | "dirty" | null

export const LonelinessForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    strava: "",
  })
  const [formState, setFormState] = useState<FormState>(null)
  const [formErrors, setFormErrors] = useState<String[]>([])
  const isSubmitted = formState === "submitted"
  const isDirty = formState === "dirty"
  const hasError = Boolean(formErrors.length)

  console.log({ formState, formErrors, formData })
  const handleSubmit = async evt => {
    evt.preventDefault()

    const errors = checkForErrors(formData)
    if (errors.length) {
      setFormErrors(errors)
      setFormState(null)
      return
    }
    try {
      const body = encode({ "form-name": formName, ...formData })
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      })
      console.log({
        response,
        body,
      })
      if (response.ok) {
        setFormState("submitted")
      }
    } catch (err) {
      setFormErrors(["Server error! Try again later."])
    }
  }

  const handleChange = evt => {
    const { value = "", name } = evt.target
    setFormState("dirty")
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  if (isSubmitted) {
    return (
      <div aria-live="polite">Thank you for sharing your journey with us.</div>
    )
  }

  return (
    <form
      name={formName}
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      {hasError && (
        <ul aria-live="polite">
          {formErrors.map((message, i) => (
            <li key={i}>{message}</li>
          ))}
        </ul>
      )}
      <p>
        <label>
          Your Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
      </p>
      <p>
        <label>
          Your Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
      </p>
      <p>
        <label>
          Strava URL:
          <input
            name="strava"
            value={formData.strava}
            onChange={handleChange}
          />
        </label>
      </p>
      <p>
        <button
          type="submit"
          disabled={hasError && !isDirty}
          onClick={handleSubmit}
        >
          Share your journey
        </button>
      </p>
    </form>
  )
}
