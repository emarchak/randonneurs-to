
const inFutureDate = (date: Date, after: Date) => new Date(date).setHours(0) > new Date(after).setHours(23)
const onDate = (date: Date, now: Date) => new Date(date).setHours(0) === new Date(now).setHours(0)

export const addDays = (date: Date, number: number) => new Date(new Date(date).setDate(date.getDate() + number))

function getFridayBefore(date: Date) {
    const friday = 5
    const weekday = date.getDay()
    const diff = (weekday < friday) ? (7 - friday + weekday) : (friday - weekday)

    return addDays(date, diff)
}

export const useAllowedStartTimes = () => {
    const allowedStartTimes = (time: Date, scheduleTime?: Date) => {
        const today = new Date(Date.now())
        if (scheduleTime) {
            return onDate(time, scheduleTime) && inFutureDate(time, addDays(today, 6))
        }
        return inFutureDate(time, today)
    }

    const allowedToRegister = (scheduleTime: Date) => {
        const now = new Date(Date.now())
        const registrationDeadline = getFridayBefore(scheduleTime)
        registrationDeadline.setHours(18)
        registrationDeadline.setMinutes(0)

        return now < registrationDeadline
    }
    return { allowedToRegister, allowedStartTimes }
}
