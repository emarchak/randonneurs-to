import React, { ChangeEvent, ReactNode } from "react"
import { FieldProps } from './types'
import { Help } from './Help'

import * as styles from "../../styles/form.module.scss"

type RadioTableOptionType = {
    value: string
    columns: {
        [key: string]: ReactNode
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
    name,
    options,
    columns,
    value,
    label,
    labelColumn,
    onChange,
    disabled,
    optional,
    help,
    empty = 'No options'
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