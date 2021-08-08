import { SelectOptionType } from "src/components/form/components"
import { Brevet } from "src/data/brevets"
import { getDateShort } from "src/utils"

export const getEventOptions = (brevets: Brevet[]): SelectOptionType[] => {
  const twoDaysFromNow = new Date(Date.now())
  twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2)

  const options: SelectOptionType[] = brevets.map((brevet) => ({
      value: brevet.id,
      label: `${getDateShort(brevet.date)} - ${brevet.chapter} - ${brevet.distance} - ${brevet.route}${brevet.date > twoDaysFromNow ? ' (screening not open)': ''}`,
      disabled: brevet.date > twoDaysFromNow
  }))

  return [
    {
      value: 'permanent',
      label: 'Scheduled permanent',
    },
    ...options
  ]
}
