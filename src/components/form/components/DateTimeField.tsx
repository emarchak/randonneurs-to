import React, { useState } from "react"
import { FieldProps } from './types'
import { Help } from './Help'
import DatePicker from "react-datepicker"
import { HiddenField } from "./HiddenField"

import * as styles from "../../styles/form.module.scss"
import "react-datepicker/dist/react-datepicker.css"
import { SelectField } from "./SelectField"
import { Label } from "./Label"
import { ChangeEvent } from "react"
import { getDateLong } from "src/utils"
import { InlineInputs } from "../fieldset"

const hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
const minutes = ['00', '15', '30', '45']
const timeOptions: string[] = [].concat(...hours.map(hour => minutes.map(minute => `${hour}:${minute}`)))

const getQrtHour = minutes => ((Math.round(minutes/15) * 15) % 60).toString()

type DateTimeFieldProps = Omit<FieldProps, 'value'> & {
  value: Date
  disableDate?: boolean
  onChange: (date: Date) => void
  allowedRange?: (date: Date) => boolean
}

export const DateTimeField = ({ value, name, label, hideLabel, disableDate, disabled, onChange, allowedRange, optional, help }: DateTimeFieldProps) => {
  return (
  <div className={styles.dateTimeField}>
    <label>
      <Label label={label} optional={optional} hideLabel={hideLabel} />
      <InlineInputs>
        <div><DatePicker
          wrapperClassName={styles.dateInputOverrides}
          selected={value}
          onChange={onChange}
          className={styles.input + ' ' + styles.dateInputField}
          filterDate={allowedRange}
          disabled={disabled || disableDate}
          dateFormat='MMMM d' /></div>
      <TimeField value={value} label={label} hideLabel onChange={onChange} name={name} disabled={disabled}/>
      </InlineInputs>
    </label>
    {help && <Help>{help}</Help>}
    <HiddenField name={name} value={value.toString()} />
  </div>
)}

type TimeFieldProps = Omit<FieldProps, 'value'> & {
  value: Date
  showDate?: boolean
  onChange: (date: Date) => void
}

export const TimeField = ({ value, onChange, showDate, ...props }: TimeFieldProps) => {
  const timeValue = `${String(value.getHours()).padStart(2, '0')}:${getQrtHour(value.getMinutes()).padStart(2, '0')}`

  const handleOnChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    const {value: targetValue} = evt.target
    onChange(new Date(`${getDateLong(value)} ${targetValue} ${value.getTimezoneOffset()}`))
  }

  return <SelectField {...props} onChange={handleOnChange} options={timeOptions} value={timeValue} />
}
