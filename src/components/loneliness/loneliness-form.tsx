import React, { useState, ChangeEvent } from "react"
import { ContentWrapper } from "../content-wrapper"
import { ErrorsList } from "../form/errors-list"
import { InputField } from "../form/components"
import { SubmitButton } from "../form/buttons"
import { emailRegex, stravaRegex } from "../form/regex"
import { formSubmit } from "../form/helpers"
import * as styles from "../styles/form.module.scss"
import { Form } from "../form/components"

const formName = "clubaudaxadistance"

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

type Props = {
  children?: React.ReactNode
}

export const LonelinessForm = ({ children }: Props) => {
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

  const handleSubmit = async evt => {
    evt.preventDefault()

    const errors = checkForErrors(formData)
    if (errors.length) {
      setFormErrors(errors)
      setFormState(null)
      return
    }

    const success = await formSubmit(formName, { ...formData })

    if (success) {
      setFormState("submitted")
    } else {
      setFormErrors(["Server error! Try again later."])
    }
  }

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value = "", name } = evt.target

    setFormState("dirty")
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  if (isSubmitted) {
    return (
      <div className={styles.form}>
        <ContentWrapper>
          {children}
          <div aria-live="polite">
            Thank you for sharing your journey with us. Refresh the page to
            submit again.
          </div>
        </ContentWrapper>
      </div>
    )
  }

  return (
    <Form name={formName}>

      <ContentWrapper>
        {children}
        <InputField name="name" label="Your name" value={formData.name} onChange={handleChange} />
        <InputField name="email" label="Your email" type="email" value={formData.email} onChange={handleChange} />
        <InputField name="strava" label="Strava activity url" value={formData.strava} onChange={handleChange} />
        <ErrorsList formErrors={formErrors} />
        <SubmitButton
          disabled={hasError && !isDirty}
          handleSubmit={handleSubmit}
        >
          Share your journey
        </SubmitButton>
      </ContentWrapper>
    </Form>
  )
}
