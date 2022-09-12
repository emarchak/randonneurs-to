import { useMail } from "src/data/mail"
import { registerRider } from "src/data/riders"
import { FormData } from "../../components/EventRegistrationForm"

export const registerEvent = async ({ eventId, name, route, shareRide, email, gender, chapter }: FormData) => {
  const { createContact, createList } = useMail()

  const [firstName, ...rest] = name.split(' ')
  const lastName = rest.join(' ')

  const list = await createList({ scheduleId: eventId, name: route })

  if (!list.id) {
    return false
  }

  const success = await Promise.all([
    createContact({ firstName, lastName, email, chapter, lists: [list.id] }),
    registerRider({
      eventId: parseInt(eventId),
      hideRide: !shareRide,
      email: email,
      firstName,
      lastName,
      gender
    })
  ])
  return success.every(Boolean)
}
