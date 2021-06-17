import { trackEvent } from "./tracking"

const formData = {
    email: "test@test.com",
    name: "Example person",
    input: "123456"
}

describe('trackEvent', () => {
    const gtagSpy = jest.fn().mockName("gtag")
    beforeAll(() => {
        global.gtag = gtagSpy
    })

    afterEach(() => {
        gtagSpy.mockReset()
    })

    afterAll(() => {
        delete global.gtag
    })

    it('sanitizes user params', () => {
        trackEvent("sign_up", formData)

        expect(gtagSpy).toHaveBeenCalledWith(
            "event",
            "sign_up",
            expect.objectContaining({
                input: formData.input
            })
        )
        expect(gtagSpy).toHaveBeenCalledWith(
            "event",
            "sign_up",
            expect.not.objectContaining({
                email: formData.email,
                name: formData.name
            })
        )
    })

    it('handles errors from gtag', () => {
        gtagSpy.mockImplementation(() => { throw new Error })

        expect(trackEvent("sign_up", formData)).not.toThrow()
    })
})
