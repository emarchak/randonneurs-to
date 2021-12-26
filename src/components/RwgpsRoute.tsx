import React from 'react'
import { iframe } from "./styles/route.module.scss"
type RwgpsRouteProps = {
    routeId: number
}

export const RwgpsRoute = ({ routeId }: RwgpsRouteProps) => (
    <iframe
    src={`https://ridewithgps.com/embeds?type=route&id=${routeId}`}
    className={iframe}
    scrolling="no"
  />
)
