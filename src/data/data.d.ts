declare module "*/loneliness-routes.yaml" {
    type route = {
        name: string
        description: string
        postedDate: string
        routeNumber: number
        rwgpsRouteId: number
    }
    const content: route[];
    export default content;
}

declare module "*/loneliness-riders.yaml" {
    type rider = {
        name:
        {
            first: string
            last: string
        }
        route: string
        date: string
        activityId: number
    }
    const content: rider[];
    export default content;
}