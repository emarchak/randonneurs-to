import { HandlerEvent } from '@netlify/functions'
import * as sgMail from '@sendgrid/mail'
import send from './send'

jest.mock('@sendgrid/mail')

describe('send', () => {
  const sgSendMock = jest.spyOn(sgMail, 'send')
  beforeEach(() => {
    sgSendMock.mockResolvedValue([{ body: { response: true }, statusCode: 200, headers: '' }, {}])
  })

  afterEach(() => {
    sgSendMock.mockClear()
  })

  it('sends the mail correctly', async () => {
    const event: HandlerEvent = {
      body: JSON.stringify({
        to: 'receipient@mail.com',
        subject: 'Test mail',
        body: 'hello <br/>how are you'
      })
    } as any

    const response = await send(event)
    expect(response).toEqual({
      statusCode: 200,
      body: '{\"response\":true}'
    })

    expect(sgSendMock).toHaveBeenCalledWith({
      to: 'receipient@mail.com',
      subject: 'Test mail',
      html: 'hello <br/>how are you',
      text: 'hello how are you',
      dynamic_template_data: {},
      from: 'Randonneurs Ontario <no-reply@randonneurs.to>',
      replyTo: 'Randonneurs Ontario <no-reply@randonneurs.to>',
      templateId: undefined
    })
  })

  it('handled empty params', async () => {
    const event: HandlerEvent = {
      body: JSON.stringify({
        to: 'receipient@mail.com',
        subject: 'Test mail',
        from: 'from@test.com',
        replyTo: 'reply@test.com',
        templateId: 123,
        data: { example: true }
      })
    } as any

    const response = await send(event)
    expect(response).toEqual({
      statusCode: 200,
      body: '{\"response\":true}'
    })

    expect(sgSendMock).toHaveBeenCalledWith(expect.objectContaining({
      text: ' ',
      html: ' ',
      to: 'receipient@mail.com',
      from: 'from@test.com',
      replyTo: 'reply@test.com',
      templateId: 123,
      dynamic_template_data: { example: true }
    }))
  })

  it('handles errors', async () => {
    const event: HandlerEvent = {
      body: {}
    } as any

    const response = await send(event)
    expect(response).toEqual({
      statusCode: 500,
      body: '{}'
    })
  })

})
