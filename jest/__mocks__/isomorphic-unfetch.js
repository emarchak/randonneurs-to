const fetch = jest.fn().mockImplementation(async (endpoint) => {
  if (endpoint.match(/ridewithgps/)) {
    return {
      ok: true,
      status: 200, 
      json: jest.fn().mockResolvedValue({
        route: {
          course_points: [
            {
              d: 19.79,
              n: 'CTL START',
              t: 'Control',
            },
            {
              d: 160419.013,
              n: 'CTL MIDDLE',
              t: 'Control',
            },
            {
              d: 160419.013,
              n: 'Turn left',
              t: 'Left',
            },
            {
              d: 307817.19,
              n: 'CTL FINISH',
              t: 'Control',
            }
          ]
        }
      })
  }}

  if (endpoint.match(/schedule\.php/)) {
    return {
      status: 'ok',
      json: jest.fn().mockResolvedValue({schedule: [
        {
          Sched_Id: '871',
          Chapter: 'Toronto',
          Event: 'Brevet',
          Distance: '300',
          Date: '2021-06-19',
          Route: 'Kissing Bridge',
          StartLoc: 'Tim Hortons, 152 Park Lawn Rd, Toronto',
          Stime: '06:00:00',
          Organizer: 'Register',
          Contact: 'http://randonneurs.to/registration',
          RWGPS: 'https://ridewithgps.com/routes/31557200',
          Unixtime: new Date('Sat June 19 2021 06:00 EDT').valueOf() / 1000
        }
      ]
      })
    }
  }

  return ({
    ok: true,
    json: jest.fn().mockResolvedValue({})
  })
})

module.exports = fetch
