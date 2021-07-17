import "@testing-library/jest-dom/extend-expect"

const originalError = console.error
const originalLog = console.log

const isCI = process.env.NODE_ENV === 'ci'

beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
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
  console.log = originalLog;
})
