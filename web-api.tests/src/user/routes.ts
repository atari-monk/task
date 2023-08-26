import { HttpMethod, IRouting } from 'atari-monk-api-tester-api'

export const getRoutes = (
  baseUrl: string,
  id?: string,
  email?: string
): IRouting => {
  return {
    baseUrl: baseUrl,
    endpoints: {
      createUser: {
        method: HttpMethod.POST,
        endpoint: 'users',
      },
      getUsers: {
        method: HttpMethod.GET,
        endpoint: 'users',
      },
      updateUser: {
        method: HttpMethod.PATCH,
        endpoint: `users/${id}`,
      },
      getUserIdByEmail: {
        method: HttpMethod.GET,
        endpoint: `users/email/${email}`,
      },
      deleteUser: {
        method: HttpMethod.DELETE,
        endpoint: `users/${id}`,
      },
    },
  }
}
