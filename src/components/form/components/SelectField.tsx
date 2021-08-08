import React, { ChangeEvent } from "react"
import { FieldProps } from './types'
import { Help } from './Help'

import * as styles from "../../styles/form.module.scss"
import { Label } from "./Label"

export type SelectOptionType = string | number | {
  value: string
  label: React.ReactNode
  disabled?: boolean
}

type SelectFieldProps = FieldProps & {
  options: SelectOptionType[]
  onChange: (evt: ChangeEvent<HTMLSelectElement>) => void
}

export const SelectField = ({ name, options, value, label, onChange, disabled, optional, hideLabel, help }: SelectFieldProps) => (
  <p>
    <label>
      <Label label={label} optional={optional} hideLabel={hideLabel} />
      <select
        value={value}
        name={name}
        className={styles.input + ' ' + styles.select}
        onChange={onChange}
        disabled={Boolean(disabled)}
        required={!Boolean(optional)}
      >
        <option value='' key={''}> - </option>
        {options.map((option, i) => (
          <option
            value={typeof option === 'object' ? option.value : option}
            disabled={typeof option === 'object' ? option.disabled : false}
            key={i}
            >
              {typeof option === 'object' ? option.label : option}
          </option>))
        }
      </select>
    </label>
    {help && <Help>{help}</Help>}
  </p >
)
