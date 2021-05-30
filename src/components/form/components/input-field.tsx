import React, { ChangeEvent } from "react"
import { FieldProps } from './types'
import { Help } from './Help'

import * as styles from "../../styles/form.module.scss"
import { Label } from "./Label"

type InputFieldProps = FieldProps & {
    type?: 'text' | 'email'
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void
    onBlur?: (evt: ChangeEvent<HTMLInputElement>) => void
}

export const InputField = ({ type = 'text', name, value, label, hideLabel, onChange, onBlur, disabled, optional, help }: InputFieldProps) => (
    <p>
        <label>
            <Label label={label} optional={optional} hideLabel={hideLabel} />
            <input
                type={type}
                name={name}
                className={styles.input + ' ' + styles.inputText}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                disabled={Boolean(disabled)}
                required={!Boolean(optional)}
            />
        </label>
        {help && <Help>{help}</Help>}
    </p>
)

type SelectOptionType = string | number | {
    value: string
    label: string
}

type SelectFieldProps = FieldProps & {
    options: SelectOptionType[]
    onChange: (evt: ChangeEvent<HTMLSelectElement>) => void
}

export const SelectField = ({ name, options, value, label, onChange, disabled, optional, help }: SelectFieldProps) => (
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
                {options.map((option) => {
                    const value = typeof option == 'object' ? option.value : option
                    const label = typeof option == 'object' ? option.label : option
                    return <option key={value} value={value}>{label}</option>
                })}
            </select>
        </label>
        {help && <Help>{help}</Help>}
    </p >
)

type RadioOptionType = SelectOptionType | {
    value: string
    label: React.ReactNode
}

type RadioFieldProps = FieldProps & {
    options: RadioOptionType[]
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void
}

export const RadioField = ({ name, options, value, label, onChange, disabled, optional, help }: RadioFieldProps) => (
    <p>
        <span className={styles.label}>
            {label}
            {optional && ' (optional)'}
        </span>
        {options.map((option) => {
            const optionValue = typeof option == 'object' ? option.value : option
            const optionLabel = typeof option == 'object' ? option.label : option

            return <label key={optionValue} className={styles.radioLabel}>
                <input
                    type="radio"
                    required={!Boolean(optional)}
                    disabled={Boolean(disabled)}
                    checked={value === optionValue}
                    onChange={onChange}
                    value={optionValue}
                    name={name}
                /> {' '}
                {optionLabel}
            </label>
        })}
        {help && <Help>{help}</Help>}
    </p>
)


export const Loading = () => (
    <div className={styles.loadingWrapper} aria-label={'Loading'}>
        <div className={styles.loading}><div></div><div></div><div></div><div></div></div>
    </div>
)

type CheckboxFieldProps = Omit<FieldProps, 'label' | 'value'> & {
    children: React.ReactNode,
    value: boolean,
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void
}

export const CheckboxField = ({ name, value, children, onChange, disabled, optional, help }: CheckboxFieldProps) => (
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
        {help && <Help>{help}</Help>}
    </p>
)