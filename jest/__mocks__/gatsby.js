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
        allEvent: {
          nodes: [
            {
              chapter: 'Toronto',
              distance: 200,
              event: 'brevet',
              id: 1,
              route: 'Waterfront East',
              rwgpsUrl: 'https://ridewithgps.com/routes/20784084',
              startLocation: 'Rouge GO',
              date: 'August 7 2025 08:00 EDT',
              scheduleId: '1789',
              path: 'event/path/waterfront'
            },
            {
              chapter: 'Huron',
              distance: 600,
              event: 'brevet',
              id: 2,
              route: 'Brouse\'s Beach Browser',
              rwgpsUrl: 'https://ridewithgps.com/routes/27865209',
              startLocation: 'Goderich, Ontario',
              date: 'August 14 2025 08:00 EDT',
              scheduleId: 'abcd',
              path: 'event/path/brouse-beach'
            }, {
              chapter: 'Toronto',
              eventType: 'populaire',
              distance: 60,
              date: 'August 7 2025 09:20:00 EDT',
              route: 'Rouge Ramble 60',
              startLocation: 'Second Cup, 355 Danforth Ave, Toronto',
              id: 3,
              rwgpsUrl: 'https://rwgps.com',
              scheduleId: '123',
              path: 'event/path/rouge'
            }]
        }
      }
    }

    return {}
  }),
}
