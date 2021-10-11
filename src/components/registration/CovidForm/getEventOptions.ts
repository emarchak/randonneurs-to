import { SelectOptionType } from "src/components/form/components"
import { Brevet } from "src/data/events"
import { getDateShort } from "src/utils"

export const getEventOptions = (brevets: Brevet[], openingTime: Date | null): SelectOptionType[] => {
  const options: SelectOptionType[] = brevets.map((brevet) => {
    const disabled = openingTime ? brevet.date > openingTime : false

    return {
      value: `${getDateShort(brevet.date)} - ${brevet.distance} - ${brevet.route}`,
      label: `${getDateShort(brevet.date)} - ${brevet.distance} - ${brevet.route} ${disabled ? ' (screening not open)' : ''}`,
      disabled
    }
  })

  return [
    {
      value: 'permanent',
      label: 'Scheduled permanent',
    },
    ...options
  ]
}
