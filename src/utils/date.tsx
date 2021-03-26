const dayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const monthsLong = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

const pad = (n) => (n < 10 ? '0' + n : n)

export const getTime = (d: Date) =>
    `${pad(d.getHours())}:${pad(d.getUTCMinutes())}`

export const getDateString = (d: Date) =>
    `${dayShort[d.getDay()]} ${d.getDate()} ${monthsLong[d.getMonth()]}, ${d.getFullYear()}`


export const getDateLong = (d: Date) =>
    `${dayShort[d.getDay()]} ${monthShort[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`

export const getDateTimeLong = (d: Date) =>
    `${dayShort[d.getDay()]} ${monthShort[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ${getTime(d)}`