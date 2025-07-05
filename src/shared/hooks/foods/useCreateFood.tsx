import { foodService } from '@/shared/services/food/food'
import { Food } from '@/shared/types/food'
import { useState } from 'react'
import { toast } from 'sonner'

export function useCreateFood(onSuccess?: (food: Food) => void) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCreate(food: Partial<Food>) {
    try {
      setLoading(true)
      setError(null)
      const newFood = await foodService.create(food)
      onSuccess?.(newFood)
      toast.success('Alimento criado com sucesso!')
    } catch (err) {
      console.log(err)
      toast.error('Erro ao criar alimento!')
    } finally {
      setLoading(false)
    }
  }

  return { create: handleCreate, loading, error }
}
