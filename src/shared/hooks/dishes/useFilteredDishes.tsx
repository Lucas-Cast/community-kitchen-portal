import { useState, useCallback } from 'react'
import { dishService } from '@/shared/services/dish/dish'
import { DishNutritionSummary } from '@/shared/types/dish-nutrition-summary'

export function useFilteredDishes() {
  const [data, setData] = useState<DishNutritionSummary[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchFilteredDishes = useCallback(
    async (filters: {
      carbohydrates?: number
      sodium?: number
      calories?: number
      proteins?: number
      limit?: number
      offset?: number
    }): Promise<DishNutritionSummary[]> => {
      setLoading(true)
      setError(null)
      try {
        const dishes = await dishService.getFilteredDishes(filters)
        setData(dishes)
        return dishes
      } catch (err) {
        setError((err as Error).message ?? 'Erro ao buscar pratos filtrados')
        return []
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { data, loading, error, fetchFilteredDishes }
}
