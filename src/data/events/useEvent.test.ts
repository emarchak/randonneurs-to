import { renderHook } from "@testing-library/react-hooks"
import * as ReactQuery from 'react-query'
import { useEvent } from "./useEvent"

jest.mock('react-query', () => {
    return {
        useQuery: jest.fn().mockReturnValue({}),
    }
})

describe('useEvent', () => {
    const useQuerySpy = jest.spyOn(ReactQuery, 'useQuery')
    afterEach(() => {
        useQuerySpy.mockClear()
    })
    it('calls reactQuery', () => {
        const { result } = renderHook(() => useEvent(1))

        expect(useQuerySpy).toHaveBeenCalledWith(['findEvent', 1], expect.any(Function))
        expect(result.current).toMatchObject({})
    })
})
