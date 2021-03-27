const React = require('react')
const Bugsnag = require('@bugsnag/js').default
const BugsnagPluginReact = require('@bugsnag/plugin-react').default

if (process.env.NODE_ENV !== 'development') {
    Bugsnag.start({
        apiKey: process.env.GATSBY_BUGSNAG_API_KEY,
        plugins: [new BugsnagPluginReact()],
    })

    const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)

    exports.wrapRootElement = ({ element }) => (
        <ErrorBoundary>{element}</ErrorBoundary>
    )
}
