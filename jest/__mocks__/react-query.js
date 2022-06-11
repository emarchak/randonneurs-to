const useQuery = jest.fn().mockImplementation(([queryName, ...queryArgs], fetch) => {
  if (queryName === 'findMembership') {
    return {
      isLoading: false,
      data: {
        memberships: [{
          city: 'Toronto',
          country: 'Canada',
          id: '123',
          riderName: 'Foo Bar',
          type: 'Individual Membership'
        }, {
          city: 'Toronto',
          country: 'Canada',
          id: '123',
          riderName: 'María Soledad',
          type: 'Individual Membership'
        }, {
          city: 'Toronto',
          country: 'Canada',
          id: '123',
          riderName: 'Brian O’Malley',
          type: 'Family Membership > PRIMARY FAMILY MEMBER'
        }
        ]
      }
    }
  }

  return {
    data: undefined,
    isLoading: true
  }
})

module.exports = {
  useQuery
}
