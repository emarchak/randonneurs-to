import { formatMessage } from "./formatMessage"

describe('formatMessage()', () => {
    it('formats a message', () => {
        expect(formatMessage({
            formData: {
                fieldA: 'Dan Harmon',
                fieldB: new Date('August 19 2019 08:00 EDT')
            },
            fieldLabels: {
                fieldA: 'Your name',
                fieldB: 'PBP Date'
            }
        })).toEqual("Your name: Dan Harmon \n PBP Date: Mon August 19 08:00")
    })
})