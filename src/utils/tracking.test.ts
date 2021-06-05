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
        trackEvent("sign_up", formData)

        expect(gtag).toHaveBeenCalledWith(
            "event",
            "sign_up",
            expect.objectContaining({
                input: formData.input
            })
        )
        expect(gtag).toHaveBeenCalledWith(
            "event",
            "sign_up",
            expect.not.objectContaining({
                email: formData.email,
                name: formData.name
            })
        )
    })
})