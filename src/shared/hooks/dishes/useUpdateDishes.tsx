import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { Dish } from '@/shared/types/dish'
import { dishService } from '@/shared/services/dish/dish'
import { DishPayload } from '@/shared/types/dish-payload'

export function useUpdateDishes(onSuccess?: () => void, onError?: (err: unknown) => void) {
  const [isUpdating, setIsUpdating] = useState(false)

  const updateDish = useCallback(
    async (dish: Dish, payload: DishPayload) => {
      try {
        setIsUpdating(true)
        const updated = await dishService.updateDish(dish.id, payload)
        toast.success('Prato atualizado com sucesso!')
        onSuccess?.()
        return updated
      } catch (err) {
        toast.error('Erro ao atualizar prato.')
        onError?.(err)
        throw err
      } finally {
        setIsUpdating(false)
      }
    },
    [onSuccess, onError]
  )

  return { updateDish, isUpdating }
}
