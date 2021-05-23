import React, { ChangeEvent, ReactNode, MouseEvent } from "react"
import { FieldProps } from './types'
import { Help } from './Help'

import * as styles from "../../styles/form.module.scss"

type RadioTableOptionType = {
    value: string,
    disabled?: boolean
    columns: {
        [key: string]: ReactNode
    }
}

type RadioTableProps = FieldProps & {
    options: RadioTableOptionType[]
    columns: { [key: string]: string }
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
    const handleRowSelect = (option: RadioTableOptionType) => (evt: MouseEvent<HTMLTableRowElement>) => {
        evt.stopPropagation()
        if (!(Boolean(disabled) || Boolean(option.disabled))) {
            onChange({
                currentTarget: {
                    name, value: option.value
                }
            } as ChangeEvent<HTMLInputElement>)
        }
    }

    const handleRadioSelect = (evt: ChangeEvent<HTMLInputElement>) => {
        evt.stopPropagation()
        onChange(evt)
    }

    const columnKeys = Object.keys(columns)

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
                        {columnKeys.map((key) => (<th key={key}>{columns[key]}</th>))}
                    </tr></thead>
                    <tbody>
                        {options.length === 0 && <tr>
                            <td className={styles.radioTableEmpty} colSpan={columnKeys.length + 1}>
                                {empty}
                            </td>
                        </tr>}
                        {options.map((option) => (
                            <tr key={option.value} data-checked={value === option.value} onClickCapture={handleRowSelect(option)}>
                                <td className={styles.cellSelector}>
                                    {!(Boolean(disabled) || Boolean(option.disabled)) &&
                                        <input
                                            type="radio"
                                            id={option.value}
                                            required={!Boolean(optional)}
                                            checked={value === option.value}
                                            onChange={handleRadioSelect}
                                            value={option.value}
                                            name={name}
                                        />
                                    }
                                </td>
                                {columnKeys.map((key) => (
                                    <td key={key}>
                                        <label htmlFor={labelColumn === key ? option.value : undefined}>
                                            {option.columns[key]}
                                        </label>
                                    </td>
                                ))}
                            </tr>)
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}