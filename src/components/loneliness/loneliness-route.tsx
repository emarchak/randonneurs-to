import React from "react"

import { getDateString } from "../../helpers"
import style from "../styles/loneliness-route.module.scss"

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
  const completeDate = new Date(postedDateObj.getTime() + twoWeeks)

  return (
    <article className={style.ride}>
      <div>
        <h4>
          {routeNumber}. {name}
        </h4>
        <h5>Posted on {getDateString(postedDateObj)}</h5>
        <h5>Complete by {getDateString(completeDate)}</h5>

        <p>{description}</p>
      </div>
      <iframe
        src={`https://ridewithgps.com/embeds?type=route&id=${rwgpsRouteId}`}
        className={style.iframe}
        scrolling="no"
      />
    </article>
  )
}
