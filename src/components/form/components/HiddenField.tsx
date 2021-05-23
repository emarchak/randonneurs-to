import React from "react"

type HiddenFieldProps = {
    name: string
    value: string
}

export const HiddenField = ({ name, value }: HiddenFieldProps) => (
    <input type="hidden" name={name} value={value} />
)