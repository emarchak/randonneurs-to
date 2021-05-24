export type FormState = "submitted" | "dirty" | null
export type FormData = { [key: string]: any }
export type FieldLabel = { [key: string]: any }


export type RequiredFields<Data> = Partial<keyof Data>[]
export type FieldLabels<Data> = Partial<{
    [K in keyof Data]: string
}>
