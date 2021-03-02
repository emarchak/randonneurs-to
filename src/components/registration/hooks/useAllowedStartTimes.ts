export const useAllowedStartTimes = (today = new Date()) => {
    const inFuture = (date: Date, after = today) => new Date(date).setHours(0) > new Date(after).setHours(23)
    const onDate = (date: Date, now = today) => new Date(date).setHours(0) === new Date(now).setHours(0)
    const addDays = (date: Date, number: number) => new Date(new Date(date).setDate(date.getDate() + number))

    const allowedStartTimes = (time: Date, scheduleTime?: Date) => {
        if (scheduleTime) {
            return onDate(time, scheduleTime) && inFuture(time, addDays(today, 6))
        }
        return inFuture(time, addDays(today, 13))
    }
    return { allowedStartTimes }
}
