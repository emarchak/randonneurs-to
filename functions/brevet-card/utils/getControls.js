const fetch = require('isomorphic-unfetch');
const { getOpenTime, getCloseTime } = require('./getTime')
const { getControlTime } = require('./date')

const utcOffset = 4
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

const getStartTime = ({eventDate, customStartTime}) => {
  if (!customStartTime){
    return eventDate
  }
  try {
    const time = customStartTime.split(':').map(t => parseInt(t) || 0)
    const customStart = new Date(eventDate.toString())
    customStart.setUTCHours(time[0] + utcOffset, time[1])
    return customStart
  } catch (e) {
    throw Error('Invalid custom start. Custom start times must be ##:##')
  }

}

const getControls = async ({event, customStartTime}) => {
    const route = await getRoute(event.rwgpsId)
    const eventDistance = event.distance
    const startTime = getStartTime({customStartTime, eventDate: event.date})

    const controls = route.course_points.filter((point) => point.t === 'Control')

    return controls.map((control) => {
      const controlDistance = (control.d * .001).toFixed(1)
      return {
        name: control.n,
        dist: `${controlDistance}km`,
        open: `O: ${getControlTime(getOpenTime({startTime, controlDistance, eventDistance}))}`,
        close: `C: ${getControlTime(getCloseTime({startTime, controlDistance, eventDistance}))}`,
      }
    })
}

module.exports = { getControls }
