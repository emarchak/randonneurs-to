export const useAllowedStartTimes = (today = new Date()) => {
    const inFuture = (date: Date, after = today) => new Date(date).setHours(0) > new Date(after).setHours(23)
    const inPast = (date: Date, before = today) => new Date(date).setHours(23) < new Date(before).setHours(0)
    const addDays = (date: Date, number: number) => new Date(new Date(date).setDate(date.getDate() + number))

    const allowedStartTimes = (time: Date, scheduleTime?: Date) => {
        if (scheduleTime) {
            const oneWeekAfter = addDays(scheduleTime, 8)
            const twoWeeksBefore = addDays(scheduleTime, -15)

            return inFuture(time, addDays(today, 7)) && inPast(time, oneWeekAfter) && inFuture(time, twoWeeksBefore)
        }
        return inFuture(time, addDays(today, 7))
    }
    return { allowedStartTimes }
}
