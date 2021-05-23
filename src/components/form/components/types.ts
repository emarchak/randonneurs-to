import { ReactNode } from "react"

export type FieldProps = {
    name: string
    value: string | number
    label: string
    disabled?: boolean
    optional?: boolean
    help?: ReactNode
}