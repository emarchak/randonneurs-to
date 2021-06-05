import { trackEvent } from "./tracking"


describe('trackEvent', () => {
    const gtagSpy = jest.fn().mockName("gtag")
    beforeAll(() => {
        global.gtag = gtagSpy
    })

    afterAll(() => {
        delete global.gtag
    })

    it('sanitizes user params', () => {
        const formData = {
            email: "test@test.com",
            name: "Example person",
            input: "123456"
        }
        trackEvent("testFormSubmit", formData)

        expect(gtag).toHaveBeenCalledWith(
            "event",
            "testFormSubmit",
            expect.objectContaining({
                input: formData.input
            })
        )
        expect(gtag).toHaveBeenCalledWith(
            "event",
            "testFormSubmit",
            expect.not.objectContaining({
                email: formData.email,
                name: formData.name
            })
        )
    })
})