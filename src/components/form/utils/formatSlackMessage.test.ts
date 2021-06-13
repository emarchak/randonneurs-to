import { formatSlackMessage } from "./formatSlackMessage"

describe('formatSlackMessage()', () => {
    it('formats a slack message', () => {
        const message = formatSlackMessage({
            formName: 'testForm',
            formData: {
                fieldA: 'Dan Harmon',
                fieldB: new Date('August 19 2019 08:00 EDT')
            },
            fieldLabels: {
                fieldA: 'Your name',
                fieldB: 'PBP Date'
            }
        })
        expect(message).toEqual({
            message: "Submission from testForm",
            attachments: ["Your name: Dan Harmon \nPBP Date: Mon August 19 08:00"],
        })
    })
    it('accepts a custom message', () => {
        const message = formatSlackMessage({
            message: 'A highly custom message',
            formData: {
                fieldA: 'Dan Harmon',
                fieldB: new Date('August 19 2019 08:00 EDT')
            },
            fieldLabels: {
                fieldA: 'Your name',
                fieldB: 'PBP Date'
            }
        })
        expect(message).toEqual({
            message: 'A highly custom message',
            attachments: ["Your name: Dan Harmon \nPBP Date: Mon August 19 08:00"],
        })
    })
})