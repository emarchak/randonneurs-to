import React, { ChangeEvent } from "react"
import DatePicker from "react-datepicker"

import styles from "../styles/form.module.scss"
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

type FieldProps = {
    name: string
    value: string
    label: string
    disabled?: boolean
    optional?: boolean
}

type InputFieldProps = FieldProps & {
    type?: 'text' | 'email'
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void
}

export const InputField = ({ type = 'text', name, value, label, onChange, disabled, optional }: InputFieldProps) => (
    <p>
        <label>
            <span className={styles.label}>
                {label}
                {optional && ' (optional)'}
            </span>
            <input
                type={type}
                name={name}
                className={styles.input}
                value={value}
                onChange={onChange}
                disabled={Boolean(disabled)}
                required={!Boolean(optional)}
            />
        </label>
    </p>
)

type SelectFieldProps = FieldProps & {
    options: {
        value: string
        label: string
    }[]
    onChange: (evt: ChangeEvent<HTMLSelectElement>) => void
}

export const SelectField = ({ name, options, value, label, onChange, disabled, optional }: SelectFieldProps) => (
    <p>
        <label>
            <span className={styles.label}>
                {label}
                {optional && ' (optional)'}
            </span>
            <select
                value={value}
                name={name}
                className={styles.input + ' ' + styles.select}
                onChange={onChange}
                disabled={Boolean(disabled)}
                required={!Boolean(optional)}
            >
                <option value='' key={''}> - </option>
                {options.map(({ value, label }, i) => {
                    return <option value={value} key={i}>{label}</option>
                })}
            </select>
        </label>
    </p >
)

type DateFieldProps = Omit<FieldProps, 'value'> & {
    value: Date
    onChange: (date: Date) => void
    options?: {}
}

export const DateField = ({ value, label, onChange, optional }: DateFieldProps) => (
    <div className={styles.dateInput}>
        <label>
            <span className={styles.label}>
                {label}
                {optional && ' (optional)'}
            </span>
            <DatePicker showTimeSelect wrapperClassName={styles.dateInputOverrides} selected={value} onChange={onChange} className={styles.input} dateFormat="MMMM d HH:mm" />
        </label>
    </div>
)

export const Loading = () => (
    <div className={styles.loadingWrapper} aria-label={'Loading'}>
        <div className={styles.loading}><div></div><div></div><div></div><div></div></div>
    </div>
)

type CheckboxFieldProps = Omit<FieldProps, 'label' | 'value'> & {
    children: React.ReactChild,
    value: boolean,
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void
}


export const CheckboxField = ({ name, value, children, onChange, disabled, optional }: CheckboxFieldProps) => (
    <p>
        <label>
            <input
                type={'checkbox'}
                name={name}
                className={styles.checkbox}
                checked={value}
                onChange={onChange}
                disabled={Boolean(disabled)}
                required={!Boolean(optional)}
            />

            <span className={styles.checkboxLabel}>
                {children}
                {optional && ' (optional)'}
            </span>
        </label>
    </p>
)