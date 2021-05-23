
const subHundred = '< 100'
const subTwohundred = '100 - 199'
const distanceKey = {
    [subHundred]: 100,
    [subTwohundred]: 199
}

export const sortDistances = (a, b) => {
    const aValue = isNaN(a) ? distanceKey[a] : parseInt(a)
    const bValue = isNaN(b) ? distanceKey[b] : parseInt(b)

    return aValue - bValue
}

export const getDistanceKey = (distance) => {
    if (parseInt(distance) < 100) {
        return subHundred
    }
    if (parseInt(distance) < 200) {
        return subTwohundred
    }
    return distance.toString()
}

export const getIsDistance = (distance, filterDistance: string) => getDistanceKey(distance) === filterDistance
