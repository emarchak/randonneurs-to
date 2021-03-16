const today = new Date(Date.now())
const inFuture = (date: Date, after = today) => new Date(date).setHours(0) > new Date(after).setHours(23)
const onDate = (date: Date, now = today) => new Date(date).setHours(0) === new Date(now).setHours(0)
export const addDays = (number: number) => new Date(new Date(today).setDate(today.getDate() + number))

export const useAllowedStartTimes = () => {
    const allowedStartTimes = (time: Date, scheduleTime?: Date) => {
        if (scheduleTime) {
            return onDate(time, scheduleTime) && inFuture(time, addDays(6))
        }
        return inFuture(time, today)
    }

    const allowedToRegister = (scheduleTime: Date) => {
        return inFuture(scheduleTime, addDays(2))
    }
    return { allowedToRegister, allowedStartTimes }
}
