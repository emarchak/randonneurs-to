
const timeZone = 'America/Toronto'

const time = {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
}

const day = {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    weekday: 'short',
}

const dateShort = {
    timeZone,
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    year: 'numeric'
}

const getTime = (d) => new Intl.DateTimeFormat('en', time).format(d)

const getDate = (d) => new Intl.DateTimeFormat('en', dateShort).format(d).replace(/,/g, '')

const getControlTime = (d) => new Intl.DateTimeFormat('en', day).format(d)

module.exports = { getTime, getDate, getControlTime }