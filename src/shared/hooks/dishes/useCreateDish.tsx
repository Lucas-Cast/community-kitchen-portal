import { dishService } from '@/shared/services/dish/dish'
import { Dish } from '@/shared/types/dish'
import { DishPayload } from '@/shared/types/dish-payload'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'

function getErrorMessage(err: any): string {
  return err?.response?.data?.message || err?.message || 'Erro desconhecido.'
}

export function useCreateDish(onSuccess?: (dish: Dish) => void, onError?: (err: unknown) => void) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreate = useCallback(
    async (dish: DishPayload) => {
      if (!dish) return

      setLoading(true)
      setError(null)

      return dishService
        .createDish(dish)
        .then(newDish => {
          toast.success('Prato criado com sucesso!')
          onSuccess?.(newDish)
          return newDish
        })
        .catch(err => {
          const message = getErrorMessage(err)
          toast.error(`Erro ao tentar criar um prato: ${message}`)
          setError(message)
          onError?.(err)
          throw err
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [onSuccess, onError]
  )

  return { create: handleCreate, loading, error }
}
