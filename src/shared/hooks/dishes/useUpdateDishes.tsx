import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { Dish } from '@/shared/types/dish'
import { dishService } from '@/shared/services/dish/dish'
import { DishPayload } from '@/shared/types/dish-payload'

function getErrorMessage(err: any): string {
  return err?.response?.data?.message || err?.message || 'Erro desconhecido.'
}

export function useUpdateDishes(onSuccess?: () => void, onError?: (err: unknown) => void) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateDish = useCallback(
    async (dish: Dish, payload: DishPayload) => {
      if (!dish?.id || !payload) return

      setIsUpdating(true)
      setError(null)

      return dishService
        .updateDish(dish.id, payload)
        .then(updated => {
          toast.success('Prato atualizado com sucesso!')
          onSuccess?.()
          return updated
        })
        .catch(err => {
          const message = getErrorMessage(err)
          toast.error(`Erro ao atualizar o prato: ${message}`)
          setError(message)
          onError?.(err)
          throw err
        })
        .finally(() => {
          setIsUpdating(false)
        })
    },
    [onSuccess, onError]
  )

  return { updateDish, isUpdating, error }
}
