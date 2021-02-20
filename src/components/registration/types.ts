type Chapter = 'Toronto' | 'Huron' | 'Ottawa' | 'Simcoe'

export type RideType = 'brevet' | 'permanent' | 'fleche' | 'populaire'

export type Route = {
    chapter: Chapter
    distance: number
    startLocation: string
    routeName: string
    id: string
}

export type Brevet = {
    chapter: Chapter
    contact: string
    date: string
    distance: string
    event: RideType
    organizer: string
    route: string
    rwgps: string
    startloc: string
    sched_id: string
    stime: string
    unixtime: number
}