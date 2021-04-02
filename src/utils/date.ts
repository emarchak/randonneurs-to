const dayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const monthsLong = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const pad = (n) => (n < 10 ? '0' + n : n)

const timeZone = 'America/Toronto'
export const getTime = (d: Date) => {
    const matches = d.toLocaleTimeString('en-US', { timeZone }).match(/(\d+):(\d{2}):(\d{2}) (AM|PM)/i)
    const inMorning = matches[4] === 'AM'

    const hours = inMorning ? Number(matches[1]) : Number(matches[1]) + 12
    const minutes = Number(matches[2])

    console.log(d.toString())
    return `${pad(hours)}:${pad(minutes)}`
}

export const getDateString = (d: Date) =>
    `${dayShort[d.getDay()]} ${d.getDate()} ${monthsLong[d.getMonth()]}, ${d.getFullYear()}`

export const getDateLong = (d: Date) =>
    `${dayShort[d.getDay()]} ${monthsLong[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`

export const getDateTimeLong = (d: Date) =>
    `${dayShort[d.getDay()]} ${monthsLong[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ${getTime(d)}`

export const getDateTimeShort = (d: Date) =>
    `${dayShort[d.getDay()]} ${monthsShort[d.getMonth()]} ${d.getDate()}, ${getTime(d)}`