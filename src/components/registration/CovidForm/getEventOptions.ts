import { Brevet } from "src/data/brevets"
import { getDateShort } from "src/utils"

export const getEventOptions = (brevets: Brevet[]): Array<{ value: string, label: string, disabled: boolean }> => {
  const twoDaysFromNow = new Date(Date.now())
  twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2)

  const options = brevets.map((brevet) => ({
      value: brevet.id,
      label: `${getDateShort(brevet.date)} - ${brevet.chapter} - ${brevet.distance} - ${brevet.route}${brevet.date > twoDaysFromNow ? ' (screening not allowed)': ''}`,
      disabled: brevet.date > twoDaysFromNow
  }))

  options.unshift({
      value: 'permanent',
      label: 'Scheduled permanent',
      disabled: false
  })

  return options
}
