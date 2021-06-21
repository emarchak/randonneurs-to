
const getEvent = async (scheduleId) => {
    const ride = {
        distance: 300,
        name: 'Kissing Bridge',
        chapter: 'Toronto',
        id: '',
        rwgpsId: 31557200,
        date: new Date('Sat June 19 2021 04:59 EDT')
    }

    if (!ride) {
        throw Error(`Missing event ${scheduleId}`)
    }
    return ride
}

module.exports = { getEvent }