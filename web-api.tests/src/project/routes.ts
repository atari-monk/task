import { HttpMethod, IRouting } from 'atari-monk-api-tester-api'

export const getRoutes = (
  baseUrl: string,
  userId?: string,
  projectId?: string
): IRouting => {
  return {
    baseUrl: baseUrl,
    endpoints: {
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
      deleteProject: {
        method: HttpMethod.DELETE,
        endpoint: `projects/${projectId}`,
      },
    },
  }
}
