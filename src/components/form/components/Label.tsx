import React from 'react'
import { LabelProps } from './types'
import * as styles from "../../styles/form.module.scss"

export const Label = ({ label, optional, hideLabel, id }: LabelProps) => (
    <span id={id} className={`${styles.label} ${Boolean(hideLabel) ? styles.hidden : ''}`} >
        {label}
        {optional && ' (optional)'}
    </span>)
