import React from "react"
import { FieldProps } from './types'
import { Help } from './Help'
import DatePicker from "react-datepicker"
import { HiddenField } from "./HiddenField"
import { SelectField } from "./SelectField"
import { Label } from "./Label"
import { ChangeEvent } from "react"
import { InlineInputs } from "../fieldset"
import { getTime, getToday } from "src/utils"

import * as styles from "../../styles/form.module.scss"
import "react-datepicker/dist/react-datepicker.css"

const hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
const minutes = ['00', '15', '30', '45']
const timeOptions: string[] = [].concat(...hours.map(hour => minutes.map(minute => `${hour}:${minute}`)))

const calcTime = (time: string) => time.split(':').map(x => isNaN(parseInt(x)) ? 0 : parseInt(x))
const getQrtHour = minutes => ((Math.round(minutes/15) * 15) % 60).toString()

type DateTimeFieldProps = Omit<FieldProps, 'value'> & {
  value: Date | ''
  disableDate?: boolean
  onChange: (date: Date) => void
  allowedRange?: (date: Date) => boolean
}

export const DateTimeField = ({ value, name, label, hideLabel, disableDate, disabled, onChange, allowedRange, optional, help }: DateTimeFieldProps) => {
  const id = `${name}Id`

  return (
  <div className={styles.dateTimeField}>
      <Label label={label} optional={optional} hideLabel={hideLabel} />
      <InlineInputs>
        <label>
          <Label label={label + ' date select'} hideLabel={true} id={id} />
          <DatePicker
            wrapperClassName={styles.dateInputOverrides}
            selected={value}
            onChange={onChange}
            className={styles.input}
            filterDate={allowedRange}
            disabled={disabled || disableDate}
            dateFormat='MMMM d'
            ariaLabelledBy={id}
            />
        </label>
        <TimeField
          value={value}
          label={label + 'time select'}
          hideLabel
          onChange={onChange}
          name={name + 'Time'}
          disabled={disabled}/>
      </InlineInputs>
    {help && <Help>{help}</Help>}
    <HiddenField name={name} value={value?.toString()} />
  </div>
)}

type TimeFieldProps = Omit<FieldProps, 'value'> & {
  value: Date | ''
  onChange: (date: Date) => void
}

const defaultSourceValue = () => {
  const twoDaysFromToday = getToday()
  twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2)

  twoDaysFromToday.setUTCHours(10, 0, 0) // 06:00 EDT
  return twoDaysFromToday
}

export const TimeField = ({ value, onChange, ...props }: TimeFieldProps) => {
  const sourceValue = value || defaultSourceValue()

  const [selectedHrs, selectedMins] = calcTime(getTime(sourceValue))
  const timeValue = `${String(selectedHrs).padStart(2, '0')}:${getQrtHour(selectedMins).padStart(2, '0')}`

  const handleOnChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    const {value: targetValue} = evt.target
    const [hours, minutes] = calcTime(targetValue)

    const newDate = new Date(sourceValue)
    newDate.setHours(hours, minutes, 0, 0)
    onChange(newDate)
  }

  return <SelectField {...props} onChange={handleOnChange} options={timeOptions} value={timeValue} />
}
