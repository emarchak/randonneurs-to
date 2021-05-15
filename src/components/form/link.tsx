import React from 'react'
import { Link as GastsbyLink } from 'gatsby'

export type LinkProps = {
    children: React.ReactChild,
    className?: string,
} & (
        | { to: string; href?: never }
        | { to?: never; href: string }
    )

export const Link = ({ to, href, className = '', children }: LinkProps) => (
    to
        ? <GastsbyLink to={to} className={className}>{children}</GastsbyLink>
        : <a href={href} target="_blank" rel="noopener" className={className}>{children}</a>
)
