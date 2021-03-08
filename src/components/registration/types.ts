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
    distance: number
    event: RideType
    id: string
    organizer: string
    route: string
    rwgpsUrl: string
    rwgpsId: number
    season: number
    startLocation: string
    date: Date
}
