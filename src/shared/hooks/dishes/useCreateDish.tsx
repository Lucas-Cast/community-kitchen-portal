import { dishService } from '@/shared/services/dish/dish'
import { Dish } from '@/shared/types/dish'
import { DishPayload } from '@/shared/types/dish-payload'
import { useState } from 'react'
import { toast } from 'sonner'

export function useCreateDish(onSuccess?: (dish: Dish) => void) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCreate(dish: DishPayload) {
    try {
      setLoading(true)
      setError(null)
      const newDish = await dishService.createDish(dish)
      onSuccess?.(newDish)
      toast.success('Prato criado com sucesso!')
    } catch (err) {
      console.log(err)
      toast.error('Erro ao tentar criar um prato!')
    } finally {
      setLoading(false)
    }
  }

  return { create: handleCreate, loading, error }
}
