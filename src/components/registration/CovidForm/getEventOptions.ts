import { SelectOptionType } from "src/components/form/components"
import { Brevet } from "src/data/brevets"
import { getDateShort, getToday } from "src/utils"

export const getEventOptions = (brevets: Brevet[]): SelectOptionType[] => {
  const deadline = getToday()
  deadline.setDate(deadline.getDate() + 3)

  const options: SelectOptionType[] = brevets.map((brevet) => ({
      value: `${getDateShort(brevet.date)} - ${brevet.distance} - ${brevet.route}`,
      label: `${getDateShort(brevet.date)} - ${brevet.distance} - ${brevet.route} ${brevet.date > deadline ? ' (screening not open)': ''}`,
      disabled: brevet.date > deadline
  }))

  return [
    {
      value: 'permanent',
      label: 'Scheduled permanent',
    },
    ...options
  ]
}
