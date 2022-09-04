import "@testing-library/jest-dom/extend-expect"
import MockDate from 'mockdate'
const originalError = console.error
const originalLog = console.log

const isCI = process.env.NODE_ENV === 'ci'

beforeAll(() => {
  MockDate.set(new Date(2021, 0, 1, 0, 0, 0, 0))

    console.error = (...args) => {
      if (/Warning.*not wrapped in act/.test(args[0]) || /render is no longer supported/.test(args[0])) {
        return;
      }
      originalError.call(console, ...args);
    }
  if (isCI) {
    console.log = jest.fn()
  }
})

afterAll(() => {
  console.error = originalError;
  if (isCI) {
    console.log = originalLog
  }
})
