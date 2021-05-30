const {handler: graphqlProxy} = require("./graphql-proxy");

const query = "query Chapters {\n  chapters {\n    name\n    __typename\n  }\n}\n"
const data = {"chapters":[{"name":"Toronto"}, {"name":"Ottawa"}]}

const event = {
  httpMethod: "POST",
  headers: {
    "content-type": "application/json",
    "apollographql-client-name": "test",
  },
  body: {
    query
  }
}

process.env.GRAPHQL_URL= "https://grapql"

describe("graphql-proxy()", () => {
  const consoleSpy = jest.spyOn(console, "log")
  const mockFetch = jest.fn().mockReturnValue({
    ok: true,
    status: 200, 
    json: jest.fn().mockResolvedValue({data})
  });

  beforeAll(() => {
    global.fetch = mockFetch;
    consoleSpy.mockImplementation()
  });

  afterEach(() => {
    mockFetch.mockReset();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
    
    global.fetch.mockClear()
    delete global.fetch
  })

  it("proxies requested information", async () => {
    const response = await graphqlProxy(event);

    expect(mockFetch).toHaveBeenCalledWith(
      "https://grapql",
      expect.objectContaining({
        method: event.httpMethod,
        headers: expect.objectContaining({
          "content-type": event.headers["content-type"],
          "apollographql-client-name": event.headers["apollographql-client-name"],
        }),
        body: expect.objectContaining({query})
      })
    )

    expect(response.body).toContain(JSON.stringify(data));
    expect(response.statusCode).toBe(200);
  });

  it("returns error if graphql not responding", async () => {
    mockFetch.mockRejectedValue({message: 'Uh oh'});

    const response = await graphqlProxy(event);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(expect.stringContaining('Uh oh'));
  });
});
