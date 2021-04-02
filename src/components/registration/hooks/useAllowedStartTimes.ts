import { Brevet } from "../../../hooks/useBrevets"

const inFutureDate = (date: Date, after: Date) => new Date(date).setHours(0) > new Date(after).setHours(23)
const onDate = (date: Date, now: Date) => new Date(date).setHours(0) === new Date(now).setHours(0)
const addDays = (date: Date, number: number) => new Date(new Date(date).setDate(date.getDate() + number))

const weekdays = {
    'Sun': 0,
    'Mon': 1,
    'Tue': 2,
    'Wed': 3,
    'Thu': 4,
    'Fri': 5,
    'Sat': 6,
}

function getWeekdayBefore(day: keyof typeof weekdays, date: Date) {
    const weekday = weekdays[day]
    const dayOfDate = date.getDay()
    const diff = (dayOfDate < weekday) ? (7 - weekday + dayOfDate) : (weekday - dayOfDate)

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

    const getBrevetRegistrationDeadline = (brevet: Brevet) => {
        switch (brevet.chapter) {
            case 'Ottawa':
                const ottawaDeadline = getWeekdayBefore('Fri', brevet.date)
                ottawaDeadline.setHours(18, 0, 0)
                return ottawaDeadline
            default:
                const deadline = addDays(brevet.date, -3)
                deadline.setHours(23, 59, 0)
                return deadline
        }
    }

    const allowedToRegister = (brevet: Brevet) => {
        const now = new Date(Date.now())
        const registrationDeadline = getBrevetRegistrationDeadline(brevet)

        return now < registrationDeadline
    }
    return { allowedToRegister, allowedStartTimes, getBrevetRegistrationDeadline }
}
