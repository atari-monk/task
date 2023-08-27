import { HttpMethod, IRouting } from 'atari-monk-api-tester-api'

export const getRoutes = (
  url: string,
  userId?: string,
  projectId?: string
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
      getUserProjectById: {
        method: HttpMethod.GET,
        endpoint: `projects/${projectId}?userId=${userId}`,
      },
      getUserProjects: {
        method: HttpMethod.GET,
        endpoint: `projects/user?userId=${userId}`,
      },
      getAllProjects: {
        method: HttpMethod.GET,
        endpoint: 'projects/all',
      },
      updateProject: {
        method: HttpMethod.PATCH,
        endpoint: `projects/${projectId}`,
      },
      deleteUser: {
        method: HttpMethod.DELETE,
        endpoint: `users/${userId}`,
      },
      deleteProject: {
        method: HttpMethod.DELETE,
        endpoint: `projects/${projectId}`,
      },
    },
  }
}
