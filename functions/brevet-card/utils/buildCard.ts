import { getDate } from './date'
import { getTimeLimit } from './getTime'
import { getControls } from './getControls'
import { getEvent } from './getEvent'

const localeOpts = {
  minimumIntegerDigits: 2,
  useGrouping: false
}
type buildCardArgs = {
  riderNames: string[]
  scheduleId: number
  customStartTime?: string
}

export const buildCard = async ({ riderNames, customStartTime, scheduleId }: buildCardArgs) => {
  const event = await getEvent(scheduleId)
  const timeLimit = getTimeLimit(event.distance)
  const controls = await getControls({ event, customStartTime })

  const card = {
    distance: event.distance,
    evname: event.name,
    evstart: getDate(event.date),
    maxhours: timeLimit.h.toLocaleString('en-US', localeOpts),
    maxminutes: timeLimit.m.toLocaleString('en-US', localeOpts),
    emergetel: "vp@randonneurs.to",
    riderlist: riderNames.map(fname => { return { fname } }),
    controllist: controls,
  }

  console.log(card)
  return card
}

