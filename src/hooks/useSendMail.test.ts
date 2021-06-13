import { renderHook } from '@testing-library/react-hooks'
import * as isomorphicUnfetch from 'isomorphic-unfetch'
import { useSendMail } from './useSendMail'

describe('useSendMail()', () => {
    const fetchSpy = jest.spyOn(isomorphicUnfetch, 'default')

    afterEach(() => {
        fetchSpy.mockClear()
    })

    it('calls lambda function', async () => {
        const { result } = renderHook(() => useSendMail())
        const emailContent = {
            to: 'foo@bar.com',
            subject: 'Test email',
            data: { body: 'Hello' }
        }
        const response = await result.current.sendMail(emailContent)

        expect(response).toEqual(true)
        expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail', expect.objectContaining({
            body: JSON.stringify(emailContent)
        }))
    })
    it('returns false on error', async () => {
        fetchSpy.mockRejectedValueOnce({ ok: false })
        const { result } = renderHook(() => useSendMail())

        const response = await result.current.sendMail({
            to: 'foo@bar.com',
            subject: 'Test email',
        })

        expect(response).toEqual(false)
    })

    it('includes template and data if provided', async () => {
        const { result } = renderHook(() => useSendMail())
        const emailContent = {
            to: 'foo@bar.com',
            from: 'bar@baz.com',
            subject: 'Test email',
            data: {
                'baz': 'qux'
            }
        }
        const response = await result.current.sendMail(emailContent, "brevetRegistration")

        expect(response).toEqual(true)
        expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail', expect.objectContaining({
            body: JSON.stringify({
                ...emailContent,
                templateId: 'd-6d0774ec805f41e09c68b2da5e79978a'
            })
        }))
    })
})