export const cancelledUntil = () => process.env.CANCELLED_UNTIL ? new Date(process.env.CANCELLED_UNTIL) : 0
export * from './registerEvent'
