import React, { ReactNode } from "react"

import { help } from "../../styles/form.module.scss"

export const Help = ({ children }: { children: ReactNode }) => (
    <span className={help}>{children}</span>
)
