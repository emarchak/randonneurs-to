import { FieldLabels, RequiredFields, FormData } from './types'

export const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export const stravaRegex = /^((?:https?:)?\/\/)?((?:www)\.)?((?:strava\.com))(\/activities\/)([\d\-]+)?$/

export const validate = <Fields extends FormData>(
    fields: Fields,
    fieldLabels: FieldLabels<Fields>,
    requiredFields: RequiredFields<Fields>
) =>
    Object.entries(fields)
        .map(([field, value]) => {
            if (requiredFields.includes(field) && !Boolean(value)) {
                return `${fieldLabels[field] || field} is required`
            }

            if (field === "email" && !emailRegex.test(value)) {
                return `${value} is not a valid email`
            }

            if (field === "strava" && !stravaRegex.test(value)) {
                return `${value} is not a valid strava activity url. It should be in the format https://www.strava.com/activities/11111111`
            }
        })
        .filter(Boolean)
