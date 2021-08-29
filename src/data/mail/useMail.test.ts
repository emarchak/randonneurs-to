
import { renderHook } from '@testing-library/react-hooks'
import * as isomorphicUnfetch from 'isomorphic-unfetch'
import { useMail } from './useMail'

describe('useMail()', () => {
    const fetchSpy = jest.spyOn(isomorphicUnfetch, 'default')

    afterEach(() => {
        fetchSpy.mockClear()
    })

    it('calls lambda function', async () => {
        const { result } = renderHook(() => useMail())
        const emailContent = {
            to: 'foo@bar.com',
            subject: 'Test email',
            data: { body: 'Hello' }
        }
        const response = await result.current.sendMail(emailContent)

        expect(response).toEqual(true)
        expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/send', expect.objectContaining({
            body: JSON.stringify(emailContent)
        }))
    })
    it('returns false on error', async () => {
        fetchSpy.mockRejectedValueOnce({ ok: false })
        const { result } = renderHook(() => useMail())

        const response = await result.current.sendMail({
            to: 'foo@bar.com'
        })

        expect(response).toEqual(false)
    })

    it('includes template and data if provided', async () => {
        const { result } = renderHook(() => useMail())
        const emailContent = {
            to: 'foo@bar.com',
            from: 'bar@baz.com',
            data: {
                'baz': 'qux'
            }
        }
        const response = await result.current.sendMail(emailContent, "brevetRegistration")

        expect(response).toEqual(true)
        expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/send', expect.objectContaining({
            body: JSON.stringify({
                ...emailContent,
                templateId: 'd-6d0774ec805f41e09c68b2da5e79978a'
            })
        }))
    })
})
