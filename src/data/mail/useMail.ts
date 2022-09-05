import { sendMail } from './api/sendMail'
import { createList, getList } from './api/lists'
import { createContact } from './api/contact'

export const useMail = () => ({
  createContact,
  createList,
  getList,
  sendMail
})
