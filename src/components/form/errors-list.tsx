import React, { ReactChild } from "react"

import styles from "../styles/form.module.scss"

type Props = {
    formErrors: ReactChild[]
}

export const ErrorsList = ({ formErrors }: Props) => {
    if (!Boolean(formErrors.length)) return <></>

    return (
        <ul className={styles.errorList} aria-live="polite">
            {formErrors.map((message, i) => (
                <li className={styles.error} key={i}>
                    {message}
                </li>
            ))}
        </ul>
    )
}