const React = require("react")

const gatsby = jest.requireActual("gatsby")

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
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
  graphql: jest.fn(),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn(),
}
