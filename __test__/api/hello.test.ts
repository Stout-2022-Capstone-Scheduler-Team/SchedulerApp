import httpMocks from 'node-mocks-http'
import hello from '../../pages/api/hello'

test('api route', () => {
  const request = httpMocks.createRequest({
    method: 'GET',
    url: '/api/hello'
  })

  const response = httpMocks.createResponse()

  hello(request, response)

  const data = response._getJSONData() // short-hand for JSON.parse( response._getData() )
  expect(data.name === 'Bob Dog')

  expect(response.statusCode === 200)
  expect(response._isEndCalled())
  expect(response._isJSON())
  expect(response._isUTF8())

  // test.done()
})
