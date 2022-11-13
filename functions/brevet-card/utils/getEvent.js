const fetch = require('cross-fetch');

const scheduleEndpoint = (id) => `https://www.randonneursontario.ca/brevetcard/schedule.php?id=${id}`
const getRwgpsId = (rwgps) => rwgps.match(/^((?:https?:)?\/\/)?((?:www)\.)?((?:ridewithgps\.com))(\/routes\/)([\d\-]+)?$/).pop();

const getEvent = async (scheduleId) => {
  try {
    const response = await fetch(scheduleEndpoint(scheduleId))
    if (!response.status === 'ok') {
      throw new Error(response.statusText)
    }

    const data = await response.json()
    const event = data.schedule[0];

    if (!event['Distance']) {
      throw Error(`Missing event ${scheduleId}`)
    }

    return {
      distance: parseInt(event['Distance']),
      name: event['Route'],
      chapter: event['Chapter'],
      id: event['Sched_Id'],
      rwgpsId: getRwgpsId(event['RWGPS']),
      date: new Date(event['Unixtime'] * 1000)
    }
  } catch (e) {
    throw Error(e.message)
  }
}

module.exports = { getEvent }
