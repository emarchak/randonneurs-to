import "@testing-library/jest-dom/extend-expect"

const originalError = console.error
const originalLog = console.log

beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  }
  console.log = jest.fn()
})

afterAll(() => {
  console.error = originalError;
  console.log = originalLog;
})
