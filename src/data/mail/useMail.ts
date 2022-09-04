import { sendMail } from './api/sendMail'
import { createList, getList } from './api/lists'

export const useMail = () => ({
  createList,
  getList,
  sendMail
})
