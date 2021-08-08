import { renderHook } from '@testing-library/react-hooks'
import { useRiders } from './useRiders'

jest.mock('gatsby', () => ({
    graphql: jest.fn(),
    useStaticQuery: jest.fn().mockReturnValue({
        allRider: {
            nodes: [
                {
                    fullName: 'María Soledad',
                    membership: 'Individual',
                    seasons: [2021]
                },
                {
                    fullName: 'Brian O’Malley',
                    membership: 'Individual',
                    seasons: [2021]
                },
                {
                    fullName: 'Mary Quiet-Contrary',
                    membership: 'Family',
                    seasons: [2021]
                }
            ]
        }
    })
}))

describe('useCheckRiderMembership()', () => {
    it('returns member if found', () => {
        const { result } = renderHook(() => useRiders())

        const member = result.current.checkMembership({ fullName: 'mary quietcontrary' })

        expect(member).toEqual({
            fullName: 'Mary Quiet-Contrary',
            membership: 'Family',
            seasons: [2021]
        })
    })

    it('returns undefined if member not found', () => {
        const { result } = renderHook(() => useRiders())

        const member = result.current.checkMembership({ fullName: 'mary shepherd' })

        expect(member).toBeUndefined()
    })

    it('ignores parenthesis', () => {
        const { result } = renderHook(() => useRiders())

        const member = result.current.checkMembership({ fullName: 'María (de la) Soledad' })

        expect(member).toEqual({
            fullName: 'María Soledad',
            membership: 'Individual',
            seasons: [2021]
        })
    })

    it('ignores apostrophes', () => {
        const { result } = renderHook(() => useRiders())

        const member = result.current.checkMembership({ fullName: 'Brian O\'Malley' })

        expect(member).toEqual(                {
            fullName: 'Brian O’Malley',
            membership: 'Individual',
            seasons: [2021]
        })
    })
})
