import fetch from 'isomorphic-unfetch'

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
    Unixtime?: number
}

export type RemoteRoute = {
    route_brevet_distance?: number
    route_chapter?: number
    route_cuesheet?: string
    route_distance?: number
    route_name?: string
    route_start_location?: string
}

export type RemoteEvent = {
    event_date?: string
    event_eventtype?: number
    event_name?: string
    event_route?: number
    event_schedule_id?: string
    event_start_time?: string
}

export const eventtypeKey = (test: string) => {
    const eventtypeNames = ['Brevet', 'Populaire', 'Fleche', 'Trace', 'Permanent', 'Grand brevet']
    return eventtypeNames.indexOf(eventtypeNames.find(chapter => test.includes(chapter)) || 'Other') + 1
}

export const chapterKey = (test: string) => {
    const chapterNames = ['Toronto', 'Ottawa', 'Simcoe', 'Huron', 'Other']

    return chapterNames.indexOf(chapterNames.find(chapter => test.includes(chapter)) || 'Other') + 1
}

export const brevetDistance = (dist: number): number | undefined => {
    if (dist < 200) {
        return undefined
    }
    return Math.floor((dist / 100) + .5) * 100
}

export const fetchEvents = async (): Promise<RawEvent[]> => {
    const response = await fetch(endpoint)
    const data = await response.json()

    if (data.status !== 'ok') {
        throw new Error(`randOnt response ${response.status}`)
    }

    return data.schedule as RawEvent[]
}

export const fetchQuery = async (query: string) => {
    const response = await fetch(dbUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            [process.env.GRAPHQL_SECRETKEY]: process.env.GRAPHQL_SECRET,

        },
        body: JSON.stringify({ query: query.replace(/"([^"]+)":/g, '$1:') })
    })
    const data = await response.json()
    return data
}

export const buildRoute = (rawEvent: RawEvent): RemoteRoute => ({
    route_brevet_distance: brevetDistance(parseInt(rawEvent.Distance)),
    route_distance: parseInt(rawEvent.Distance),
    route_name: rawEvent.Route,
    route_start_location: rawEvent.StartLoc,
    route_cuesheet: rawEvent.RWGPS || undefined,
    route_chapter: chapterKey(rawEvent.Chapter),
})
