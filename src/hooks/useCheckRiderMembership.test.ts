import { renderHook } from '@testing-library/react-hooks'
import { useCheckRiderMembership } from './useCheckRiderMembership'

jest.mock('gatsby', () => ({
    graphql: jest.fn(),
    useStaticQuery: jest.fn().mockReturnValue({
        allRider: {
            nodes: [
                {
                    city: 'Toronto',
                    country: 'Canada',
                    fullName: 'María Soledad',
                    membership: 'Individual',
                    seasons: [2021]
                },
                {
                    city: 'Toronto',
                    country: 'Canada',
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
        const { result } = renderHook(() => useCheckRiderMembership())

        const member = result.current.checkMembership({ fullName: 'mary quietcontrary' })

        expect(member).toEqual({
            city: 'Toronto',
            country: 'Canada',
            fullName: 'Mary Quiet-Contrary',
            membership: 'Family',
            seasons: [2021]
        })
    })

    it('returns undefined if member not found', () => {
        const { result } = renderHook(() => useCheckRiderMembership())

        const member = result.current.checkMembership({ fullName: 'mary shepherd' })

        expect(member).toBeUndefined()
    })

    it('ignores parenthesis', () => {
        const { result } = renderHook(() => useCheckRiderMembership())

        const member = result.current.checkMembership({ fullName: 'María (de la) Soledad' })

        expect(member).toEqual({
            city: 'Toronto',
            country: 'Canada',
            fullName: 'María Soledad',
            membership: 'Individual',
            seasons: [2021]
        })
    })
})