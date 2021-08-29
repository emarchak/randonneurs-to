import fetch from 'isomorphic-unfetch'

const mailTemplates = {
    'brevetRegistration': 'd-6d0774ec805f41e09c68b2da5e79978a',
    'defaultForm': 'd-72b32a8ddf0d473783046d9911229cf7'
}

type sendMailParams = {
    to: string | string[],
    replyTo?: string,
    from?: string,
    data?: Object
}

export const sendMail = async (params: sendMailParams, template?: keyof typeof mailTemplates) => {
  try {
      const templateId = mailTemplates[template] || undefined
      const response = await fetch('/.netlify/functions/send-mail/send', {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: JSON.stringify({
              ...params,
              templateId
          }),
      })

      return response.ok
  }
  catch (err) {
      return false
  }
}
