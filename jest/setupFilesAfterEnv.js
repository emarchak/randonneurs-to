import "@testing-library/jest-dom/extend-expect"
import MockDate from 'mockdate'
const originalError = console.error
const originalLog = console.log


beforeAll(() => {
  MockDate.set(new Date(2021, 0, 1, 0, 0, 0, 0))

    console.error = (...args) => {
      if (/Warning.*not wrapped in act/.test(args[0]) || /render is no longer supported/.test(args[0])) {
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
