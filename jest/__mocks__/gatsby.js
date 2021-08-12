const React = require("react")

const gatsby = jest.requireActual("gatsby")

module.exports = {
  ...gatsby,
  graphql: jest.fn().mockImplementation(q => q),
  Link: jest.fn().mockImplementation(
    // these props are invalid for an `a` tag
    ({
      activeClassName,
      activeStyle,
      getProps,
      innerRef,
      partiallyActive,
      ref,
      to,
      ...rest
    }) =>
      React.createElement("a", {
        ...rest,
        href: to,
      }),
  ),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn().mockImplementation(query => {
    if (query[0].match(/allEvent/)) {
      return {
        allEvent: { nodes: [
          {
            chapter: 'Toronto',
            distance: 200,
            event: 'brevet',
            id: 1,
            route: 'Waterfront East',
            rwgpsUrl: 'https://ridewithgps.com/routes/20784084',
            startLocation: 'Rouge GO',
            date: 'August 7 2021 08:00 EDT'
          }]
        }}
    }

    return {}
  }),
}
