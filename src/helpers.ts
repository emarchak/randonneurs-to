const months = [
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

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export const getDateString = (d: Date) => {
  const date = d.getDate()
  const year = d.getFullYear()

  const monthName = months[d.getMonth()]
  const dayName = days[d.getDay()]

  return `${dayName} ${date} ${monthName}, ${year}`
}
