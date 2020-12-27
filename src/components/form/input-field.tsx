import React, { ChangeEvent } from "react"
import Flatpickr from "react-flatpickr"

import styles from "../styles/form.module.scss"

type FieldProps = {
    name: string
    value: string
    label: string
    onChange: (evt: ChangeEvent) => void
}

type InputFieldProps = FieldProps & {
    type?: 'text' | 'email'
}

export const InputField = ({ type = 'text', name, value, label, onChange }: InputFieldProps) => (
    <p>
        <label>
            <span className={styles.label}>{label}</span>
            <input
                type={type}
                name={name}
                className={styles.input}
                value={value}
                onChange={onChange}
            />
        </label>
    </p>
)

type SelectFieldProps = FieldProps & {
    options: string[]
}

export const SelectField = ({ name, options, value, label, onChange }: SelectFieldProps) => (
    <p>
        <label>
            <span className={styles.label}>{label}</span>
            <select value={value} name={name} className={styles.input + ' ' + styles.select} onChange={onChange}>
                <option value=''> </option>
                {options.map(option => {
                    return <option value={option} key={option}>{option}</option>
                })}
            </select>
        </label>
    </p >
)

type DateFieldProps = Omit<FieldProps, 'value'> & {
    value: Date
}

export const DateField = ({ name, value, label, onChange }: DateFieldProps) => (
    <p>
        <label>
            <span className={styles.label}>{label}</span>
            <Flatpickr
                className={styles.input}
                data-enable-time
                value={value}
                onChange={onChange}
            />
        </label>
    </p>
)