import React, { ChangeEvent } from "react"
import { FieldProps } from './types'
import { Help } from './Help'

import * as styles from "../../styles/form.module.scss"
import { Label } from "./Label"

type TextFieldProps = FieldProps & {
    onChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void
    onBlur?: (evt: ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextField = ({ name, value, label, hideLabel, onChange, onBlur, disabled, optional, help }: TextFieldProps) => (
    <p>
        <label>
            <Label label={label} optional={optional} hideLabel={hideLabel} />
            <textarea
                name={name}
                className={styles.input + ' ' + styles.inputText + ' ' + styles.textField}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                disabled={Boolean(disabled)}
                required={!Boolean(optional)}
                rows={3}
            />
        </label>
        {help && <Help>{help}</Help>}
    </p>
)