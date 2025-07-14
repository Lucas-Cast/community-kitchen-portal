import { useCallback, useState } from 'react'
import { dishService } from '@/shared/services/dish/dish'
import { DishNutritionSummary } from '@/shared/types/dish-nutrition-summary'
import { toast } from 'sonner'

function getErrorMessage(err: any): string {
  return err?.response?.data?.message || err?.message || 'Erro desconhecido.'
}

export function useDishNutritionSummary() {
  const [nutritionSummary, setNutritionSummary] = useState<DishNutritionSummary | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchNutritionSummary = useCallback(async (dishId: number) => {
    if (!dishId) return

    setLoading(true)
    setError(null)

    return dishService
      .getDishNutritionFacts(dishId)
      .then(result => {
        setNutritionSummary(result)
      })
      .catch(err => {
        const message = getErrorMessage(err)
        setError(message)
        toast.error(`Erro ao buscar informações nutricionais do prato: ${message}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { nutritionSummary, fetchNutritionSummary, loading, error }
}
