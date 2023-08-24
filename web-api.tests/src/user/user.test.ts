import { expect } from 'chai'
import { ApiTester } from 'atari-monk-api-tester-lib'
import { getRoutes } from './routes'

describe('Task web api User tests', () => {
  const baseUrl = 'http://localhost:3000/api/v1'
  let userId: string = ''
  const email = 'test.test@gmail.com'

  const tester = new ApiTester()
  tester.routing = getRoutes(baseUrl)

  it('should test POST request successfully', async () => {
    const key = 'createUser'
    const postData = {
      email,
      displayName: 'test',
      maxRecords: 0,
    }

    const response = await tester.post(key, postData)

    userId = response.data._id as string
    tester.routing = getRoutes(baseUrl, userId, email)
    
    expect(response.status).to.equal(201)
    expect(response.data).to.include(postData)
  })

  it('should test GET request successfully', async () => {
    const key = 'getUsers'

    const expectedData = {
      _id: userId,
      email,
      displayName: 'test',
      maxRecords: 0,
    }

    const response = await tester.get(key)

    expect(response.status).to.equal(200)

    const adminUser = response.data.find((u: any) => u.email === email)
    expect(adminUser).to.deep.equal(expectedData)
  })

  it('should test DELETE request successfully', async () => {
    const key = 'deleteUser'

    const response = await tester.delete(key)

    expect(response.status).to.equal(200)
  })
})