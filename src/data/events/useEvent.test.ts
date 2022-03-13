import { renderHook } from "@testing-library/react-hooks"
import * as ReactQuery from 'react-query'
import * as GraphQLRequest from 'graphql-request'
import { useEvent } from "./useEvent"

jest.mock('react-query', () => {
    return {
        useQuery: jest.fn().mockImplementation(async (args, callback) => await callback()),
    }
})

describe('useEvent', () => {
    const useQuerySpy = jest.spyOn(ReactQuery, 'useQuery')
    const requestSpy = jest.spyOn(GraphQLRequest, 'request')

    afterEach(() => {
        useQuerySpy.mockClear()
        requestSpy.mockClear()
    })
    it('calls reactQuery', () => {
        requestSpy.mockResolvedValue({
            events: [{ eventId: 1 }]
        })

        const { result } = renderHook(() => useEvent(1))
        expect(useQuerySpy).toHaveBeenCalledWith(['findEvent', 1], expect.any(Function))
        expect(result.current).toMatchObject({})
    })
})
