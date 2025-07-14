import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { menuService } from '../../services/menu/menu'
import { CreateMenuRequest } from '../../types/menu'

function getErrorMessage(err: any): string {
  return err?.response?.data?.message || err?.message || 'Erro desconhecido.'
}

export function useUpsertMenu(onSuccess?: () => void, onError?: (err: unknown) => void) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createMenu = useCallback(
    async (request: CreateMenuRequest) => {
      if (!request) return

      setIsLoading(true)
      setError(null)

      return menuService
        .createMenu(request)
        .then(() => {
          toast.success('Menu criado com sucesso!')
          onSuccess?.()
        })
        .catch(err => {
          const message = getErrorMessage(err)
          toast.error(`Erro ao criar o menu: ${message}`)
          setError(message)
          onError?.(err)
          throw err
        })
        .finally(() => {
          setIsLoading(false)
        })
    },
    [onSuccess, onError]
  )

  const updateMenu = useCallback(
    async (id: number, request: CreateMenuRequest) => {
      if (!id || !request) return

      setIsLoading(true)
      setError(null)

      return menuService
        .updateMenu(id, request)
        .then(() => {
          toast.success('Menu atualizado com sucesso!')
          onSuccess?.()
        })
        .catch(err => {
          const message = getErrorMessage(err)
          toast.error(`Erro ao atualizar o menu: ${message}`)
          setError(message)
          onError?.(err)
          throw err
        })
        .finally(() => {
          setIsLoading(false)
        })
    },
    [onSuccess, onError]
  )

  return {
    createMenu,
    updateMenu,
    isLoading,
    error,
  }
}
