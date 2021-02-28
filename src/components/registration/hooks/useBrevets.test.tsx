import React from 'react'
import { render, fireEvent } from "@testing-library/react"
import { UpcomingBrevets } from "../upcoming-brevets"
import { Brevet } from '../types'

const brevet: Brevet = {
    chapter: "Toronto",
    event: "populaire",
    distance: "60",
    date: "2021-03-14",
    route: "Rouge Ramble 60",
    startloc: "Second Cup, 355 Danforth Ave, Toronto",
    stime: "10:00:00",
    organizer: "Register",
    contact: "https://example.com",
    rwgps: "https://rwgps.com",
    Unixtime: 1615726800
}


jest.mock('isomorphic-unfetch', () => ({
    __esModule: true,
    default: jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(
            {
                status: 'ok',
                schedule:
                    [{
                        chapter: 'Toronto',
                        distance: 200,
                        startLocation: 'Starbucks',
                        routeName: 'Urban 200'
                    }, {
                        chapter: 'Huron',
                        distance: 300,
                        startLocation: 'Careys House',
                        routeName: 'Golf 300'
                    }]
            }
        )
    })
}))

describe('useBrevets()', () => {
    it.skip('returns loading when brevets are unavailable', () => { })
    it.skip('returns brevets in lowercase format', () => { })
})