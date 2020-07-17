const {handler: buttondown} = require("../buttondown");

const mockFetch = jest.fn().mockReturnValue({status: 200});

describe("buttondown()", () => {
  beforeAll(() => {
    global.fetch = mockFetch;
  });
  afterEach(() => {
    mockFetch.mockReset();
  });

  it("returns success when called", async () => {
    const response = await buttondown({body: '{"email":"rider@example.com"}'});

    expect(response.body).toEqual("{\"error\":\"\"}");
    expect(response.statusCode).toBe(201);
  });

  it("returns error if email does not exist", async () => {
    const response = await buttondown({body: '{}'});

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(expect.stringContaining('Email is required'));
  });

  it("returns error if buttondown not responding", async () => {
    mockFetch.mockResolvedValue({status: 404});

    const response = await buttondown({body: '{"email":"rider@example.com"}'});

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(expect.stringContaining('There was an error'));
    fetch.mockReset();
  });

  it("returns error if buttondown not responding", async () => {
    mockFetch.mockRejectedValue('Uh oh');

    const response = await buttondown({body: '{"email":"rider@example.com"}'});

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(expect.stringContaining('Uh oh'));
  });
});
