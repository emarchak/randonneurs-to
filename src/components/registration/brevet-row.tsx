import React from 'react'
import { Brevet } from 'src/hooks/useBrevets'
import { getDateLong, getTime, getDateTimeShort } from 'src/utils'
import styles from 'src/components/styles/registration.module.scss'
import { useAllowedStartTimes } from './hooks/useAllowedStartTimes'


type Props = { brevet: Brevet, isSelected: boolean, fieldsetID: string, handleChange: (brevet) => void }

export const BrevetRow = ({ brevet, isSelected, fieldsetID, handleChange }: Props) => {
    const { allowedToRegister, getBrevetRegistrationDeadline } = useAllowedStartTimes()

    const classNames = `${styles.brevetRow} ${isSelected ? styles.brevetRowSelected : ''}`

    const registrationDeadline = getBrevetRegistrationDeadline(brevet)
    const canRegister = allowedToRegister(brevet)

    const onChange = () => {
        handleChange(brevet)
    }

    return (
        <tr className={classNames} onClick={canRegister ? onChange : null} >
            <td>
                {canRegister && <input
                    type="radio"
                    aria-labelledby={brevet.id}
                    name={fieldsetID}
                    value={brevet.id}
                    onChange={onChange}
                    checked={isSelected}
                    className={styles.brevetRadio}
                />}
            </td>
            <td>
                {getDateLong(brevet.date)}
                <small><br />
                    {canRegister && 'Registration deadline: ' + getDateTimeShort(registrationDeadline)}
                    {!canRegister && 'Registration closed'}
                </small>
            </td>
            <td>{getTime(brevet.date)}</td>
            <td>{brevet.chapter}</td>
            <td>{brevet.distance}{' '}{brevet.event}</td>
            <td>
                <label id={brevet.id} htmlFor={brevet.id}><strong>{brevet.route}</strong>
                    <br />
                    <small>{brevet.startLocation}</small>
                    {brevet.rwgpsUrl && <>
                        <br />
                        <small>(<a href={brevet.rwgpsUrl} target="_blank">View {brevet.route} route</a>)</small>
                    </>}
                </label>
            </td>
        </tr>
    )
}
