import React from "react"
import { FieldProps } from './types'
import { Help } from './Help'
import DatePicker from "react-datepicker"
import { HiddenField } from "./HiddenField"

import * as styles from "../../styles/form.module.scss"
import "react-datepicker/dist/react-datepicker.css"

type DateFieldProps = Omit<FieldProps, 'value'> & {
    value: Date
    onChange: (date: Date) => void
    allowedRange?: (date: Date) => boolean
    options?: {}
}

export const DateField = ({ value, name, label, onChange, allowedRange, optional, help }: DateFieldProps) => (
    <div className={styles.dateInput}>
        <label>
            <span className={styles.label}>
                {label}
                {optional && ' (optional)'}
            </span>
            <DatePicker
                showTimeSelect
                wrapperClassName={styles.dateInputOverrides}
                selected={value}
                onChange={onChange}
                className={styles.input + ' ' + styles.dateInputField}
                filterDate={allowedRange}
                dateFormat="MMMM d HH:mm" />
        </label>
        {help && <Help>{help}</Help>}
        <HiddenField name={name} value={value.toString()} />
    </div>
)