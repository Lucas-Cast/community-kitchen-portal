import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { Food } from '@/shared/types/food'
import { foodService } from '@/shared/services/food/food'

export function useUpdateFood(onSuccess?: () => void, onError?: (err: unknown) => void) {
  const [isUpdating, setIsUpdating] = useState(false)

  const updateFood = useCallback(
    async (food: Food, payload: Partial<Food>) => {
      try {
        setIsUpdating(true)
        const updated = await foodService.update(food.id, payload)
        toast.success('Alimento atualizado com sucesso!')
        onSuccess?.()
        return updated
      } catch (err) {
        toast.error('Erro ao atualizar alimento.')
        onError?.(err)
        throw err
      } finally {
        setIsUpdating(false)
      }
    },
    [onSuccess, onError]
  )

  return { updateFood, isUpdating }
}
