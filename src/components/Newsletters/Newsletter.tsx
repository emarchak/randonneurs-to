import React from 'react'

type NewsletterProps = {
  categories: string[]
  name: string
  subject: string
  sentAt: Date
  htmlContent: HTMLElement
}

const Newsletter = (props) => (
  <>
    <p>Hello</p>
    <p>{JSON.stringify(props)}</p>

  </>
)

export default Newsletter
