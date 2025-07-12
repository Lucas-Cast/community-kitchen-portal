import { useState } from 'react'
import { dishService } from '@/shared/services/dish/dish'
import { DishNutritionSummary } from '@/shared/types/dish-nutrition-summary'
import { toast } from 'sonner'

export function useDishNutritionSummary() {
  const [nutritionSummary, setNutritionSummary] = useState<DishNutritionSummary | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchNutritionSummary(dishId: number) {
    try {
      setLoading(true)
      setError(null)
      const result = await dishService.getDishNutritionFacts(dishId)
      setNutritionSummary(result)
    } catch (err) {
      console.error(err)
      setError('Erro ao buscar informações nutricionais do prato.')
      toast.error('Erro ao buscar informações nutricionais!')
    } finally {
      setLoading(false)
    }
  }

  return { nutritionSummary, fetchNutritionSummary, loading, error }
}
