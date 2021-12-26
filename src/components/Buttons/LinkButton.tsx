import React from 'react'
import { Link, LinkProps } from 'src/components/Link'
import { ButtonTypes, getButtonClassName } from './utils'

type LinkButtonProps = ButtonTypes & LinkProps

export const LinkButton = (props: LinkButtonProps) => <Link {...props} className={getButtonClassName(props)} />
