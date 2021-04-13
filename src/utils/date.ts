import 'date-time-format-timezone'

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

type DateParts = {
    weekday: string
    literal: string
    month: string
    day: string
    year: string
    hour: string
    minute: string
    dayPeriod: string
    timeZoneName: string
}

const getDateParts = (d: Date, options: Intl.DateTimeFormatOptions = {}) => new Intl.DateTimeFormat('en', {
    timeZone,
    timeZoneName: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
    hour12: true,
    ...options
}).formatToParts(d).reduce((result, datePart) => {
    result[datePart.type] = datePart.value
    return result
}, {} as DateParts)

export const getTime = (d: Date) => {
    const p = getDateParts(d)
    return `${p.hour}:${p.minute}`
}

export const getDateLong = (d: Date) => {
    const p = getDateParts(d)
    return `${p.weekday} ${p.month} ${p.day}, ${p.year}`
}

export const getDateString = getDateLong

export const getDateTimeLong = (d: Date) => {
    const p = getDateParts(d)
    return `${p.weekday} ${p.month} ${p.day}, ${p.year} ${getTime(d)}`
}

export const getDateTimeShort = (d: Date) => {
    const p = getDateParts(d)
    return `${p.weekday} ${p.month} ${p.day} ${getTime(d)}`
}
