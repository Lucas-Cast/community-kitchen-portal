export interface SignInRequest {
  email: string
  senha: string
}

export interface SignUpRequest {
  email: string
  nome: string
  senha: string
}

export interface User {
  id: number
  nome: string
  email: string
  is_active: boolean
}

export interface SignInResponse {
  token: string
  usuario: User
}

export interface TokenValidateResponse {
  valid: boolean
  user: User
}
