import { expect } from 'chai'
import { ApiTester } from 'atari-monk-api-tester-lib'
import { getRoutes } from './routes'

describe('Test Project endpoints', () => {
  const url = 'http://localhost:3000/api/v1'
  const user = {
    _id: '',
    email: 'test.user@gmail.com',
    displayName: 'test-user',
    maxRecords: 0,
  }
  const project = {
    _id: '',
    name: 'test-project',
    description: 'test-description',
    userId: '',
    isVisible: true,
  }
  const tester = new ApiTester()
  tester.routing = getRoutes(url)

  it('should test POST request successfully', async () => {
    const key = 'createUser'

    const response = await tester.post(key, user)

    user._id = response.data._id as string
    project.userId = user._id
    tester.routing = getRoutes(url, user._id)

    expect(response.status).to.equal(201)
    expect(response.data).to.include(user)
  })

  it('should test POST request successfully', async () => {
    try {
      const response = await tester.post('createUserProject', project)

      project._id = response.data._id as string
      tester.routing = getRoutes(url, user._id, project._id)

      expect(response.status).to.equal(201)
      expect(response.data).to.include(project)
    } catch (error) {
      console.log(error)
    }
  })

  it('should test GET request successfully', async () => {
    const key = 'getUserProjectById'

    const response = await tester.get(key)

    expect(response.status).to.equal(200)
    expect(response.data).to.include(project)
  })

  it('should test GET request successfully', async () => {
    const key = 'getUserProjects'

    const response = await tester.get(key)

    expect(response.status).to.equal(200)
    const projectDb = response.data.find((p: any) => {
      return p._id === project._id
    })
    expect(projectDb).to.include(project)
  })

  it('should test DELETE request successfully', async () => {
    const key = 'deleteUser'

    const response = await tester.delete(key)

    expect(response.status).to.equal(200)
  })

  it('should test DELETE request successfully', async () => {
    const key = 'deleteProject'

    const response = await tester.delete(key)

    expect(response.status).to.equal(200)
  })
})
