import React, { useState, ChangeEvent } from 'react'
import { ContentWrapper } from 'src/components/content-wrapper'
import { InputField, ErrorsList, SubmitButton, Form } from 'src/components/form/components'
import { formSubmit, FormState, RequiredFields, validate } from 'src/components//form/utils'
import * as styles from '../styles/form.module.scss'

const formName = 'clubaudaxadistance'

const fieldLabels = {
  name: 'Your name',
  email: 'Your email',
  strava: 'Strava activity url'
}

const requiredFields: RequiredFields<FormData> = ['name', 'email', 'strava']

type FormData = {
  name: string
  email: string
  strava: string
}

type Props = {
  children?: React.ReactNode
}

export const LonelinessForm = ({ children }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    strava: '',
  })
  const [formState, setFormState] = useState<FormState>(null)
  const [formErrors, setFormErrors] = useState<string[]>([])
  const isSubmitted = formState === 'submitted'
  const isDirty = formState === 'dirty'
  const hasError = Boolean(formErrors.length)

  const handleSubmit = async evt => {
    evt.preventDefault()

    const errors = validate(formData, fieldLabels, requiredFields)
    if (errors.length) {
      setFormErrors(errors)
      setFormState(null)
      return
    }

    const success = await formSubmit(formName, { ...formData })

    if (success) {
      setFormState('submitted')
    } else {
      setFormErrors(['Server error! Try again later.'])
    }
  }

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value = '', name } = evt.target

    setFormState('dirty')
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
          <div aria-live='polite'>
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
        <InputField name='name' label='Your name' value={formData.name} onChange={handleChange} />
        <InputField name='email' label='Your email' type='email' value={formData.email} onChange={handleChange} />
        <InputField name='strava' label='Strava activity url' value={formData.strava} onChange={handleChange} />
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
