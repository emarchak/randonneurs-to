const {getTime, getDate} = require('./date')
const { getTimeLimit } = require('./getTime')
const { getControls } = require('./getControls')
const { getEvent } = require('./getEvent')

const localeOpts = {
  minimumIntegerDigits: 2,
  useGrouping: false
}

const buildCard = async ({riderName, startTime, scheduleId}) =>  {
    const event = await getEvent(scheduleId)
    const timeLimit = getTimeLimit(event.distance)
    const controls = await getControls({event, startTime})

    return {
        distance:    event.distance,
        evname:      event.name,
        evstart:     getDate(event.date),
        maxhours:    timeLimit.h.toLocaleString('en-US', localeOpts),
        maxminutes:  timeLimit.m.toLocaleString('en-US', localeOpts),
        emergetel:   "vp@randonneurs.to",
        riderlist:   [{fname: riderName}],
        controllist: controls,
      }
}

module.exports = { buildCard }