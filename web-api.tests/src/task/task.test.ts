import { expect } from 'chai'
import { ApiTester } from 'atari-monk-api-tester-lib'
import { getRoutes } from './routes'

describe('Test Task endpoints', () => {
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
  const task = {
    _id: '',
    description: 'test-description',
    userId: '',
    projectId: '',
  }
  const taskPatch = {
    ...task,
    description: 'test-description-patch',
  }
  const taskFinish = {
    ...taskPatch,
    finishedAt: new Date().toISOString(),
    summary: 'test-summary',
  }
  const tester = new ApiTester()
  tester.routing = getRoutes(url)

  it('should test POST user request successfully', async () => {
    const key = 'createUser'

    const response = await tester.post(key, user)

    user._id = response.data._id as string
    project.userId = user._id
    task.userId = user._id
    taskPatch.userId = task.userId
    taskFinish.userId = task.userId
    tester.routing = getRoutes(url, user._id)

    expect(response.status).to.equal(201)
    expect(response.data).to.include(user)
  })

  it('should test POST project request successfully', async () => {
    try {
      const response = await tester.post('createUserProject', project)

      project._id = response.data._id as string
      task.projectId = project._id
      taskPatch.projectId = task.projectId
      taskFinish.projectId = task.projectId
      tester.routing = getRoutes(url, user._id, project._id)

      expect(response.status).to.equal(201)
      expect(response.data).to.include(project)
    } catch (error) {
      console.log(error)
    }
  })

  it('should test POST task request successfully', async () => {
    try {
      const response = await tester.post('createTask', task)

      task._id = response.data._id as string
      taskPatch._id = task._id
      taskFinish._id = task._id
      tester.routing = getRoutes(url, user._id, project._id, task._id)

      expect(response.status).to.equal(201)
      expect(response.data).to.include(task)
    } catch (error) {
      console.log(error)
    }
  })

  it('should test GET Tasks For User request successfully', async () => {
    const key = 'getTasksForUser'

    const response = await tester.get(key)

    expect(response.status).to.equal(200)
    const taskDb = response.data.find((t: any) => {
      return t._id === task._id
    })
    expect(taskDb).to.include(task)
  })

  it('should test GET Tasks For user and project request successfully', async () => {
    const key = 'getTasksForUserAndProject'

    const response = await tester.get(key)

    expect(response.status).to.equal(200)
    const taskDb = response.data.find((t: any) => {
      return t._id === task._id
    })
    expect(taskDb).to.include(task)
  })

  it('should test GET all tasks request successfully', async () => {
    const key = 'getAllTasks'

    const response = await tester.get(key)

    expect(response.status).to.equal(200)
    const taskDb = response.data.find((t: any) => {
      return t._id === task._id
    })
    expect(taskDb).to.include(task)
  })

  it('should test PATCH task request successfully', async () => {
    const key = 'updateTask'

    const response = await tester.patch(key, taskPatch)

    expect(response.status).to.equal(200)
    expect(response.data).to.include(taskPatch)
  })

  it('should test PATCH task finish request successfully', async () => {
    const key = 'finishTask'

    const response = await tester.patch(key, taskFinish)

    expect(response.status).to.equal(200)
    expect(response.data).to.include(taskFinish)
  })

  it('should test DELETE user request successfully', async () => {
    const key = 'deleteUser'

    const response = await tester.delete(key)

    expect(response.status).to.equal(200)
  })

  it('should test DELETE project request successfully', async () => {
    const key = 'deleteProject'

    const response = await tester.delete(key)

    expect(response.status).to.equal(200)
  })

  it('should test DELETE task request successfully', async () => {
    const key = 'deleteTask'

    const response = await tester.delete(key)

    expect(response.status).to.equal(200)
  })
})
