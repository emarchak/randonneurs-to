import Bugsnag from "@bugsnag/js"

const isomorphicGtag = () => typeof gtag !== "undefined" ? gtag : () => { }

export const trackEvent = (eventName: Gtag.EventNames, eventParams?: Gtag.ControlParams | Gtag.EventParams | Gtag.CustomParams) => {
    const gtag = isomorphicGtag()
    try {
        gtag("event", eventName, {
            ...eventParams,
            name: undefined,
            email: undefined,
        })
    } catch (e) {
        Bugsnag.notify(e)
    }
}
