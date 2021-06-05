
const isomorphicGtag = () => typeof gtag !== "undefined" ? gtag : console.log

export const trackEvent = (eventName: Gtag.EventNames | string, eventParams?: Gtag.ControlParams | Gtag.EventParams | Gtag.CustomParams) => {
    const gtag = isomorphicGtag()

    gtag("event", eventName, {
        ...eventParams,
        name: undefined,
        email: undefined,
    })
}