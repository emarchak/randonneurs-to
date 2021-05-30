import { validate } from "./validate"

describe('validate()', () => {
    const fields = {
        name: 'erin',
        email: 'erin@email.com',
        message: 'Hello 1234',
    }
    const fieldLabels = {
        name: 'Your name',
        email: 'Your email',
        message: 'Your message',
    }
    it('returns an error for missing required fields', () => {
        expect(validate({ ...fields, empty: '' }, { ...fieldLabels, empty: 'Unfilled' }, ['empty'])).toEqual([
            'Unfilled is required'
        ])
    })

    it('returns an the field key if label is missing', () => {
        expect(validate({ ...fields, empty: '' }, { ...fieldLabels }, ['empty'])).toEqual([
            'empty is required'
        ])
    })

    it('returns an error for invalid emails', () => {
        expect(validate({ ...fields, email: 'none' }, fieldLabels, [])).toEqual([
            'none is not a valid email'
        ])
    })

    it('returns an error for invalid strava urls', () => {
        const strava = '1111'
        expect(validate({ ...fields, strava }, fieldLabels, [])).toEqual([
            `${strava} is not a valid strava activity url. It should be in the format https://www.strava.com/activities/11111111`
        ])
    })
})