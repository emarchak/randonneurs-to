import { createSchemaCustomization } from "./createSchemaCustomization"


describe('createSchemaCustomization()', () => {
  const createTypesSpy = jest.fn().mockName('createTypes')
  const actions = { createTypes: createTypesSpy }

  afterEach(() => {
    createTypesSpy.mockReset()
  })

  it('creates types', () => {
    createSchemaCustomization({ actions } as any, null, null)
    expect(createTypesSpy).toHaveBeenCalled()
  })
})
