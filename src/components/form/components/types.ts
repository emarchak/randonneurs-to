import { ReactNode } from "react"

export type LabelProps = {
    label: string
    hideLabel?: boolean
    optional?: boolean
}

export type FieldProps = LabelProps & {
    name: string
    value: string | number
    disabled?: boolean
    optional?: boolean
    help?: ReactNode
}
