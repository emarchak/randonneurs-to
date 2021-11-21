import React from "react"
import Bugsnag from "@bugsnag/js"
import BugsnagPluginReact from '@bugsnag/plugin-react'
import { BuyButtonProvider } from "../../src/components/buybutton"

if (process.env.NODE_ENV !== 'development') {
  Bugsnag.start({
    apiKey: process.env.GATSBY_BUGSNAG_API_KEY,
    plugins: [new BugsnagPluginReact()],
  })
}

const ErrorBoundary = process.env.NODE_ENV === 'development'
  ? React.Fragment
  : Bugsnag.getPlugin('react').createErrorBoundary(React)

export const wrapRootElement = ({ element }) => (
  <ErrorBoundary>
    <BuyButtonProvider>
      { element }
    </BuyButtonProvider>
  </ErrorBoundary>
)

export const onClientEntry = () => {
  // IE11 timezone polyfill
  require('date-time-format-timezone')
}
