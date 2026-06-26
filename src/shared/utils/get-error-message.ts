export function getErrorMessage(err: unknown): string {
  const error = err as { response?: { data?: { message?: string } }; message?: string }
  return error?.response?.data?.message || error?.message || 'Erro desconhecido.'
}
