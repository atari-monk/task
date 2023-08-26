import { expect } from 'chai'
import { ApiTester } from 'atari-monk-api-tester-lib'
import { getRoutes } from './routes'

describe('Test User endpoints', () => {
  const url = 'http://localhost:3000/api/v1'
  const user = {
    _id: '',
    email: 'test.user@gmail.com',
    displayName: 'test-user',
    maxRecords: 0,
  }
  const userPatch = {
    ...user,
    displayName: 'test-user-patch',
    maxRecords: 10,
  }
  const tester = new ApiTester()
  tester.routing = getRoutes(url)

  it('should test POST request successfully', async () => {
    const key = 'createUser'

    const response = await tester.post(key, user)

    user._id = response.data._id as string
    userPatch._id = user._id
    tester.routing = getRoutes(url, user._id, user.email)

    expect(response.status).to.equal(201)
    expect(response.data).to.include(user)
  })

  it('should test GET request successfully', async () => {
    const key = 'getUsers'

    const response = await tester.get(key)

    expect(response.status).to.equal(200)
    const dbUser = response.data.find((u: any) => u.email === user.email)
    expect(dbUser).to.deep.equal(user)
  })

  it('should test PATCH request successfully', async () => {
    const key = 'updateUser'

    const response = await tester.patch(key, userPatch)

    expect(response.status).to.equal(200)
    expect(response.data).to.include(userPatch)
  })

  it('should test GET by email request successfully', async () => {
    const key = 'getUserIdByEmail'

    const response = await tester.get(key)

    expect(response.status).to.equal(200)
    expect(response.data.userId).to.equal(user._id)
  })

  it('should test DELETE request successfully', async () => {
    const key = 'deleteUser'

    const response = await tester.delete(key)

    expect(response.status).to.equal(200)
  })
})
