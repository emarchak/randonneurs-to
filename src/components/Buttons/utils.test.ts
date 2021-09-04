import { getButtonClassName } from './utils'

jest.mock('./styles/form.module.scss', () => ({
  __esmodule: true,
  primaryButton: 'primary',
  secondaryButton: 'secondary',
  blockButton: 'block',
  smallButton: 'small',
  loadingButton: 'loading'
}))

describe('getButtonClassName()', () => {
  it('builds primary button', () => {
    expect(getButtonClassName({primary: true, small: true})).toContain('primary small')
  })
  it('displays primary button', () => {
    expect(getButtonClassName({secondary: true, block: true})).toContain('secondary block')
  })
  it('displays loading button', () => {
    expect(getButtonClassName({className: 'submit', loading: true})).toContain('submit loading')
  })
})
