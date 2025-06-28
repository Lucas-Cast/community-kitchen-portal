import { createAxiosClient } from '@/shared/factories/axios-client'
import { environment } from '@/environment'
import { AxiosInstance } from 'axios'
import { Routes } from '@/shared/enums/routes'
import { SignInRequest, SignInResponse, TokenValidateResponse, User } from '@/shared/types/auth'

class UserService {
  private readonly client: AxiosInstance

  constructor() {
    this.client = createAxiosClient(environment.userControllerApiUri)
  }

  async signIn(request: SignInRequest): Promise<SignInResponse> {
    return await this.client
      .post<SignInResponse>(Routes.AUTH_LOGIN, request)
      .then(res => res.data)
      .catch(err => {
        console.error('Error during authentication:', err)
        throw err
      })
  }

  async tokenValidate(): Promise<TokenValidateResponse> {
    return await this.client
      .post<TokenValidateResponse>(Routes.TOKEN_VALIDATE)
      .then(res => res.data)
      .catch(err => {
        console.error('Error validating token:', err)
        throw err
      })
  }

  async getUserById(userId: number): Promise<User> {
    return await this.client
      .get<User>(`${Routes.USER_BY_ID}${userId}`)
      .then(res => res.data)
      .catch(err => {
        console.error('Error fetching user by ID:', err)
        throw err
      })
  }
}
export const userService = new UserService()
export default UserService
