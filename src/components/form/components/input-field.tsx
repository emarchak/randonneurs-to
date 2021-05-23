import React, { ChangeEvent, ReactChild, ReactNode } from "react"
import DatePicker from "react-datepicker"

import * as styles from "../../styles/form.module.scss"
import "react-datepicker/dist/react-datepicker.css"

type FieldProps = {
    name: string
    value: string | number
    label: string
    disabled?: boolean
    optional?: boolean
    help?: ReactChild
}

const Help = ({ children }: { children: ReactChild }) => (
    <span className={styles.help}>{children}</span>
)

type HiddenFieldProps = {
    name: string
    value: string
}

export const HiddenField = ({ name, value }: HiddenFieldProps) => (
    <input type="hidden" name={name} value={value} />
)

type InputFieldProps = FieldProps & {
    type?: 'text' | 'email'
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void
    onBlur?: (evt: ChangeEvent<HTMLInputElement>) => void
}

export const InputField = ({ type = 'text', name, value, label, onChange, onBlur, disabled, optional, help }: InputFieldProps) => (
    <p>
        <label>
            <span className={styles.label}>
                {label}
                {optional && ' (optional)'}
            </span>
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
                {options.map((option, i) => {
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


type RadioTableOptionType = {
    value: string
    columns: {
        [key: string]: React.ReactNode
    }
}

type RadioTableProps = FieldProps & {
    options: RadioTableOptionType[]
    columns: string[]
    labelColumn: string
    empty?: ReactNode
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void
}

export const RadioTable = ({
    name, options, columns, value, label, labelColumn, onChange, disabled, optional, help, empty = 'No options'
}: RadioTableProps) => {
    const handleRowSelect = (value: string) => {
        onChange({
            currentTarget: {
                name, value
            }
        } as ChangeEvent<HTMLInputElement>)
    }

    return (
        <div>
            <span className={styles.label}>
                {label}
                {optional && ' (optional)'}
            </span>
            {help && <Help>{help}</Help>}
            <div className={styles.radioTableWrapper}>
                <table className={styles.radioTable}>
                    <thead><tr>
                        <th></th>
                        {columns.map((column => (<th key={column}>{column}</th>)))}
                    </tr></thead>
                    <tbody>
                        {options.length === 0 && <tr>
                            <td className={styles.radioTableEmpty} colSpan={columns.length + 1}>
                                {empty}
                            </td>
                        </tr>}
                        {options.map(({ value: optionValue, columns }) => (
                            <tr key={optionValue} data-checked={value === optionValue} onClick={() => handleRowSelect(optionValue)}>
                                <td className={styles.cellSelector}>
                                    <input
                                        type="radio"
                                        id={optionValue}
                                        required={!Boolean(optional)}
                                        disabled={Boolean(disabled)}
                                        checked={value === optionValue}
                                        onChange={onChange}
                                        value={optionValue}
                                        name={name}
                                    />
                                </td>
                                {Object.keys(columns).map((key) => (
                                    <td key={key}>
                                        <label htmlFor={labelColumn === key ? optionValue : undefined}>
                                            {columns[key]}
                                        </label>
                                    </td>
                                ))}
                            </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}