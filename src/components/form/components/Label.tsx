import React from 'react'
import { LabelProps } from './types'
import * as styles from "../../styles/form.module.scss"

export const Label = ({ label, optional, hideLabel }: LabelProps) => (
    <span className={`${styles.label} ${Boolean(hideLabel) ? styles.hidden : ''}`} >
        {label}
        {optional && ' (optional)'}
    </span>)