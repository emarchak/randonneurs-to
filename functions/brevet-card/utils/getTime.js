// Time limits and calculations from 
// https://rusa.org/pages/acp-brevet-control-times-calculator
const addTime = (d, {h, m}) => new Date(d).setTime(d.getTime() + (h*60*60*1000) + (m*60*1000));

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

const getOpenTime = ({startTime, controlDistance, eventDistance}) => {
    if (controlDistance < 1) {
        return startTime
    }

    return startTime
}

const getCloseTime = ({startTime, controlDistance, eventDistance}) => {
    
    if (controlDistance > eventDistance) {
        const timeLimit = brevetTimeLimits[eventDistance]
        return addTime(startTime, timeLimit)
    }
    return startTime
}


module.exports = { getTimeLimit, getOpenTime, getCloseTime }