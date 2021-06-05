import React from 'react'
import { Link as GastsbyLink } from 'gatsby'
import { OutboundLink } from "gatsby-plugin-google-gtag"

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
        : <OutboundLink href={href} target="_blank" rel="noopener" className={className}>{children}</OutboundLink>
)
