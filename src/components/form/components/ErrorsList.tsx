import React, { ReactChild } from "react"
import { errorList, error } from "../../styles/form.module.scss"

type Props = {
    formErrors: ReactChild[]
}

export const ErrorsList = ({ formErrors }: Props) => {
    if (!Boolean(formErrors.length)) return <></>

    return (
        <ul className={errorList} aria-live="polite">
            {formErrors.map((message, i) => (
                <li className={error} key={i}>
                    {message}
                </li>
            ))}
        </ul>
    )
}