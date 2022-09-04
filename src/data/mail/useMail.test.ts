
import { renderHook } from '@testing-library/react-hooks'
import * as isomorphicUnfetch from 'isomorphic-unfetch'
import Bugsnag from '@bugsnag/js'
import { useMail } from './useMail'

describe('useMail()', () => {
    const fetchSpy = jest.spyOn(isomorphicUnfetch, 'default')
    const notifySpy = jest.spyOn(Bugsnag, 'notify')

    afterEach(() => {
        fetchSpy.mockClear()
        notifySpy.mockClear()
    })

    it('calls send mail function', async () => {
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

    it('fetches list', async () => {
        const { result } = renderHook(() => useMail())
        const response = await result.current.getList({ scheduleId: '420' })

        expect(response).toEqual({
            id: '1234',
            name: '420 - Example list',
            scheduleId: '420'
        })
        expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/list', expect.objectContaining({
            method: 'GET',
            body: JSON.stringify({ scheduleId: '420' })
        }))
    })

    it('fetches list with errors', async () => {
        fetchSpy.mockRejectedValueOnce({ ok: false })
        const { result } = renderHook(() => useMail())
        const response = await result.current.getList({ scheduleId: '420' })

        expect(response).toEqual({})
        expect(notifySpy).toHaveBeenCalledWith({ ok: false })
        expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/list', expect.objectContaining({
            method: 'GET',
            body: JSON.stringify({ scheduleId: '420' })
        }))
    })

    it('creates list', async () => {
        const { result } = renderHook(() => useMail())
        const response = await result.current.createList({ scheduleId: '420', name: 'Example list' })

        expect(response).toEqual({
            id: '1234',
            name: '420 - Example list',
            scheduleId: '420'
        })
        expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/list', expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({ name: '420 - Example list' })
        }))
    })

    it('creates list with errors', async () => {
        fetchSpy.mockRejectedValueOnce({ ok: false })
        const { result } = renderHook(() => useMail())
        const response = await result.current.createList({ scheduleId: '420', name: 'Example list' })

        expect(response).toEqual({})
        expect(notifySpy).toHaveBeenCalledWith({ ok: false })
        expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/list', expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({ name: '420 - Example list' })
        }))
    })
})
