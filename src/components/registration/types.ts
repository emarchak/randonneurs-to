type Chapter = 'Toronto' | 'Huron' | 'Ottawa' | 'Simcoe'

export type RideType = '' | 'brevet' | 'permanent' | 'fleche'

export type Route = {
    chapter: Chapter
    distance: number
    startLocation: string
    routeName: string
    id: string
}

export type Brevet = {
    chapter: Chapter
    event: RideType
    distance: string
    date: string
    route: string
    startloc: string
    stime: string
    organizer: string
    contact: string
    rwgps: string
    Unixtime: number
}
