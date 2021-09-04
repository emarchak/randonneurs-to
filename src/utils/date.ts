const timeZone = 'America/Toronto'

const time: Intl.DateTimeFormatOptions = {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
}

const dateShort: Intl.DateTimeFormatOptions = {
    timeZone,
    month: 'long',
    day: 'numeric',
    weekday: 'short',
}

const dateLong: Intl.DateTimeFormatOptions = {
    timeZone,
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    year: 'numeric'
}

const dateTimeShort: Intl.DateTimeFormatOptions = {
    ...time,
    ...dateShort
}

const dateTimeLong: Intl.DateTimeFormatOptions = {
    ...time,
    ...dateLong
}

const isCI = process.env.CI
export const getToday = () => {
    console.log({isCI, process: process.env.CI})
    return new Date(process.env.CI ? '01/01/2021 12:01:00' : Date.now())
    }

export const getTime = (d: Date) => new Intl.DateTimeFormat('en', time).format(d)

export const getDateLong = (d: Date) => new Intl.DateTimeFormat('en', dateLong).format(d).replace(/,/g, '')

export const getDateShort = (d: Date) => new Intl.DateTimeFormat('en', dateShort).format(d).replace(/,/g, '')

export const getDateString = getDateLong

export const getDateTimeLong = (d: Date) => new Intl.DateTimeFormat('en', dateTimeLong).format(d).replace(/,/g, '')

export const getDateTimeShort = (d: Date) => new Intl.DateTimeFormat('en', dateTimeShort).format(d).replace(/,/g, '')
