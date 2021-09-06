const fetch = jest.fn().mockImplementation(async (endpoint) => {

  if (endpoint.match(/ridewithgps.com\/routes\/\d+.json/)) {
    return {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({
        route: {
          name: 'Flat Loop',
          id: 229,
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

  if (endpoint.match(/api.sendgrid.com\/v3\/marketing\/singlesends\/\d+/)) {
    return {
      status: 'ok',
      json: jest.fn().mockResolvedValue({
        id: '1234',
        name: 'Example newsletter',
        status: 'triggered',
        categories: ['category1', 'randolist'],
        send_at: '2021-06-06T18:14:21Z'})
    }
  }

  if (endpoint.match(/api.sendgrid.com\/v3\/marketing\/singlesends/)) {
    return {
      status: 'ok',
      json: jest.fn().mockResolvedValue({
        result: [
          {
            id: '1234',
            name: 'Example newsletter',
            status: 'triggered',
            categories: ['category1', 'randolist'],
            send_at: '2021-06-06T18:14:21Z'
          },
          {
            id: '4567',
            name: 'Example draft newsletter',
            status: 'draft',
            categories: ['randolist'],
            send_at: '2021-06-06T18:14:21Z'
          }]
    })
    }
  }
  return ({
    ok: true,
    json: jest.fn().mockResolvedValue({})
  })
})

module.exports = fetch
