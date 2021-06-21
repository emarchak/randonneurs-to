require('isomorphic-unfetch');
const { getOpenTime, getCloseTime, getTimeLimit } = require('./getTime')
const { getControlTime } = require('./date')

const apiKey = process.env.RWGPS_API_KEY
const rwgpsEndpoint = (routeId) => `https://ridewithgps.com/routes/${routeId}.json?apikey=${apiKey}&version=2`

const getRoute = async (rwgpsId) => {
  try {
    const response = await fetch(rwgpsEndpoint(rwgpsId))

    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const data = await response.json()
    return data.route
  } catch (e) {
    throw Error(e.message)
  }
}

const getControls = async ({event, startDate}) => {
    const route = await getRoute(event.rwgpsId)
    const eventDistance = event.distance
    const startTime =   startDate || event.date

    console.log(getTimeLimit(event.distance))
    const controls = route.course_points.filter((point) => point.t === 'Control')

    return controls.map((control) => {
      const controlDistance = (control.d * .001).toFixed(1)
      return {
        name: control.n,
        distance: `${controlDistance}km`,
        open: `Open: ${getControlTime(getOpenTime({startTime, controlDistance, eventDistance}))}`,
        close: `Close: ${getControlTime(getCloseTime({startTime, controlDistance, eventDistance}))}`,
        
      }
    })

  
    return [    
        {       
          dist: "0.0 km",
          name: "Start",
          open: "O: Sat 04h59",
          close: "C: Sat 05h59"    
        },
      ]
}

module.exports = { getControls }