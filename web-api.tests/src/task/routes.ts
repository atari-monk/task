import { HttpMethod, IRouting } from 'atari-monk-api-tester-api'

export const getRoutes = (
  url: string,
  userId?: string,
  projectId?: string,
  taskId?: string
): IRouting => {
  return {
    baseUrl: url,
    endpoints: {
      createUser: {
        method: HttpMethod.POST,
        endpoint: 'users',
      },
      createUserProject: {
        method: HttpMethod.POST,
        endpoint: 'projects/create',
      },
      createTask: {
        method: HttpMethod.POST,
        endpoint: 'tasks',
      },
      getTasksForUser: {
        method: HttpMethod.GET,
        endpoint: `tasks/user/${userId}`,
      },
      getTasksForUserAndProject: {
        method: HttpMethod.GET,
        endpoint: `tasks/user/${userId}/${projectId}`,
      },
      updateTask: {
        method: HttpMethod.PATCH,
        endpoint: `tasks/${taskId}`,
      },
      getAllTasks: {
        method: HttpMethod.GET,
        endpoint: 'tasks/all',
      },
      finishTask: {
        method: HttpMethod.PATCH,
        endpoint: `tasks/finish/${taskId}`,
      },
      deleteUser: {
        method: HttpMethod.DELETE,
        endpoint: `users/${userId}`,
      },
      deleteProject: {
        method: HttpMethod.DELETE,
        endpoint: `projects/${projectId}`,
      },
      deleteTask: {
        method: HttpMethod.DELETE,
        endpoint: `tasks/${taskId}`,
      },
    },
  }
}
