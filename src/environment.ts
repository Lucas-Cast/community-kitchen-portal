export const environment = {
  ckApiUri: process.env.NEXT_PUBLIC_CK_API_URI ?? '',
  userControllerApiUri: process.env.NEXT_PUBLIC_USER_CONTROLLER_API_URI ?? '',
  jwtSecret: process.env.NEXT_PUBLIC_JWT_SECRET ?? '',
}
