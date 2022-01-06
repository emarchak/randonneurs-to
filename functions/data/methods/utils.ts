export const endpoint = process.env.RO_ENDPOINT || ''
export const dbUrl = process.env.GRAPHQL_URL || ''
export const rwgpsRegex = /^((?:https?:)?\/\/)?((?:www)\.)?((?:ridewithgps\.com))(\/routes\/)([\d\-]+)?$/

export type RawEvent = {
    Sched_Id?: string
    Chapter?: string
    Event?: string
    Distance?: string
    Date?: string
    Route?: string
    StartLoc?: string
    Stime?: string
    Organizer?: string
    Contact?: string
    RWGPS?: string
    Unxtime?: number
}

export type RemoteRoute = {
    route_brevet_distance?: number
    route_chapter?: number
    route_cuesheet?: string
    route_distance?: number
    route_name?: string
    route_start_location?: string
}

export const chapterKey = (test: string) => {
    const chapterNames = ['Toronto', 'Huron', 'Ottawa', 'Simcoe', 'Other']

    return chapterNames.indexOf(chapterNames.find(chapter => test.includes(chapter)) || 'Other') + 1
}

export const brevetDistance = (dist: number): number | undefined => {
    if (dist < 200) {
        return undefined
    }
    return Math.floor((dist / 100) + .5) * 100
}
