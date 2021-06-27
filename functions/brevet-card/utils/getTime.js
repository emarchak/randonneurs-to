// Time limits and calculations from 
// https://rusa.org/pages/acp-brevet-control-times-calculator

const addTime = (d, {h = 0, m = 0}) =>  new Date(d.valueOf() + (h*60*60*1000) + (m*60*1000))

const brevetTimeLimits = {
  200:  {h:13,  m: 30},
  300:  {h:20,  m: 0},
  400:  {h:27,  m: 0},
  600:  {h:40,  m: 0},
  1000: {h:75,  m: 0},
  1200: {h:90,  m: 0},
  1400: {h:116, m: 40},
  2200: {h:220, m: 0}
}

const getTimeLimit = (distance) => brevetTimeLimits[distance]

const getOpenTime = ({startTime, controlDistance}) => {
  switch (true) {
    case (controlDistance < 1):
      return startTime
    case (controlDistance < 200):
      return addTime(startTime, {
        h: controlDistance / 34
      })
    case (controlDistance >= 200 && controlDistance < 400):
      return addTime(startTime, {
        h: controlDistance / 32
      })
    case (controlDistance >= 400 && controlDistance < 600):
      return addTime(startTime, {
        h: controlDistance / 30
      })
    case (controlDistance >= 600 && controlDistance < 1000):
      return addTime(startTime, {
        h: controlDistance / 28
      })
    case (controlDistance >= 1000):
      return addTime(startTime, {
        h: controlDistance / 26
      })
  }
}

const getCloseTime = ({startTime, controlDistance, eventDistance}) => {
  switch (true) {
    case (controlDistance > eventDistance):
      return addTime(startTime, brevetTimeLimits[eventDistance])
    case (controlDistance <= 60):
      return addTime(startTime, {
        h: 1 + (controlDistance / 20)
      })
      case (controlDistance < 600):
      return addTime(startTime, {
        h: controlDistance / 15
      })
    case (controlDistance >= 600 && controlDistance < 1000):
      return addTime(startTime, {
        h: controlDistance / 11.428
      })
    case (controlDistance >= 1000):
      return addTime(startTime, {
        h: controlDistance / 13.3333
      })
  }
}

module.exports = { getTimeLimit, getOpenTime, getCloseTime }
