import React from "react"

import { getDateString } from "../../utils"

import * as styles from "../styles/loneliness-route.module.scss"

type Props = {
  name: string
  description: string
  postedDate: string
  routeNumber: number
  rwgpsRouteId: number
}

const twoWeeks = 12096e5

export const LonelinessRoute = ({
  name,
  description,
  postedDate,
  routeNumber,
  rwgpsRouteId,
}: Props) => {
  const postedDateObj = new Date(postedDate)

  return (
    <article className={styles.ride}>
      <div>
        <h3>
          {routeNumber}. {name}
        </h3>
        <h4>Posted on {getDateString(postedDateObj)}</h4>

        <p>{description}</p>
      </div>
      <iframe
        src={`https://ridewithgps.com/embeds?type=route&id=${rwgpsRouteId}`}
        className={styles.iframe}
        scrolling="no"
      />
    </article>
  )
}
