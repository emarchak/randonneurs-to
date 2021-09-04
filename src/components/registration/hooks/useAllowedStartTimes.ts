import { Brevet } from "src/data/brevets"

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
        const now = new Date(Date.now())
        if (scheduleTime) {
            return onDate(time, scheduleTime) && inFutureDate(time, addDays(now, 6))
        }
        return inFutureDate(time, now)
    }

    const getBrevetRegistrationDeadline = (brevet: Brevet) => {
        switch (brevet.chapter) {
            case 'Ottawa':
                const ottawaDeadline = getWeekdayBefore('Fri', brevet.date)
                ottawaDeadline.setUTCHours(22, 0, 0)
                return ottawaDeadline
            case 'Huron':
                const huronDeadline = getWeekdayBefore('Fri', brevet.date)
                huronDeadline.setUTCHours(24, 0, 0)
                return huronDeadline
            default:
                const deadline = addDays(brevet.date, -3)
                deadline.setUTCHours(27, 59, 0)
                return deadline
        }
    }
    const cancelledUntil = new Date('June 2 2021')
    const isBrevetCancelled = (brevet: Brevet) => brevet.date < cancelledUntil

    const allowedToRegister = (brevet: Brevet) => {
        const now = new Date(Date.now())
        const registrationDeadline = getBrevetRegistrationDeadline(brevet)
        const brevetCancelled = isBrevetCancelled(brevet)


        const canRegister = brevetCancelled ? !brevetCancelled : now < registrationDeadline
        return canRegister
    }
    return {
        allowedToRegister,
        allowedStartTimes,
        getBrevetRegistrationDeadline
    }
}
