import React, { ChangeEvent, useState } from 'react'
import { ContentWrapper } from 'src/components/content-wrapper'
import { Form, InputField, ErrorsList, SubmitButton } from 'src/components/form/components'
import { formatSlackMessage, FormState, RequiredFields, validate } from 'src/components/form/utils'
import { EventPageQuery } from 'src/gatsby.gql'
import { useSlack } from 'src/hooks/useSlack'
import { HiddenField } from 'src/components/form/components'
import { useEvent } from 'src/data/events'

type CancelRideFormProps = {
  scheduleId: number
  event: EventPageQuery['event']
}

const requiredFields: RequiredFields<FormData> = ['email', 'scheduleId']

type FormData = {
  email: string
  scheduleId?: string
  route: EventPageQuery['event']['route']
  chapter: EventPageQuery['event']['chapter']
  date: EventPageQuery['event']['date']
}

const formName = 'cancellation'

const fieldLabels = {
 email: 'Your email',
}

export const CancelRideForm = ({ scheduleId, event }: CancelRideFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    scheduleId: scheduleId.toString(),
    route: event.route,
    chapter: event.chapter,
    date: event.date
  })

  const [formState, setFormState] = useState<FormState>(null)
  const [formErrors, setFormErrors] = useState<string[]>([])
  const { data } = useEvent(scheduleId)
  const { sendSlackMsg } = useSlack()

  console.log(data)

  const isSubmitted = formState === "submitted"
  const isDirty = formState === "dirty"
  const hasError = Boolean(formErrors.length)

  const handleSubmit = async evt => {
    evt.preventDefault()

    const errors = validate(formData, fieldLabels, requiredFields)
    if (errors.length) {
      setFormErrors(errors)
      setFormState(null)
      return
    }

    const successSlack = await sendSlackMsg(formatSlackMessage({ fieldLabels, formData, formName, message }), 'registration')
    // const success = await formSubmit(formName, { ...formData })

    if (successSlack) {
      setFormState("submitted")
    } else {
      setFormErrors(["Server error! Try again later."])
    }
  }

  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value = "", name } = evt.target

    setFormState("dirty")
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  if (isSubmitted) {
    return (
      <Form name={formName}>
        <ContentWrapper>
          <div aria-live="polite">Thank you! An email has been sent confirming your cancellation.</div>
        </ContentWrapper>
      </Form>
    )
  }

  return (
    <Form name={formName}>
      <InputField name="email" label={fieldLabels.email} type="email" value={formData.email} onChange={handleChange} />
      <HiddenField name="scheduleId" value={formData.scheduleId} />
      <HiddenField name="route" value={formData.route} />
      <HiddenField name="date" value={formData.date} />
      <ErrorsList formErrors={formErrors} />
      <SubmitButton
        disabled={hasError && !isDirty}
        handleSubmit={handleSubmit}
      >
        Cancel your registration
      </SubmitButton>
    </Form>
  )
}
