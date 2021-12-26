import React from 'react'
import { Link as GastsbyLink } from 'gatsby'
import { OutboundLink } from "gatsby-plugin-google-gtag"

export type LinkProps = React.PropsWithChildren<{
    className?: string,
}> & (
        | { to: string; href?: never }
        | { to?: never; href: string }
    )

export const Link = ({ to, href, className = '', children }: LinkProps) => (
    to
        ? <GastsbyLink to={to} className={className}>{children}</GastsbyLink>
        : <OutboundLink href={href} target="_blank" rel="noopener" className={className}>{children}</OutboundLink>
)

type MapLinkProps = React.PropsWithChildren<{ location: string }>
export const MapLink = ({ location, children }: MapLinkProps) => (<Link href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}>{children}</Link>)
