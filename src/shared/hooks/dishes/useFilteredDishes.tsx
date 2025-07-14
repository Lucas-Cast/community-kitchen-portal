import { useState, useCallback } from 'react'
import { dishService } from '@/shared/services/dish/dish'
import { Dish } from '@/shared/types/dish'
import { toast } from 'sonner'

function getErrorMessage(err: any): string {
  return err?.response?.data?.message || err?.message || 'Erro desconhecido.'
}

export function useFilteredDishes() {
  const [data, setData] = useState<Dish[] | null>(null)
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
    }): Promise<Dish[]> => {
      setLoading(true)
      setError(null)

      return dishService
        .getFilteredDishes(filters)
        .then(dishes => {
          setData(dishes)
          return dishes
        })
        .catch(err => {
          const message = getErrorMessage(err)
          setError(message)
          toast.error(`Erro ao buscar pratos filtrados: ${message}`)
          return []
        })
        .finally(() => {
          setLoading(false)
        })
    },
    []
  )

  return { data, loading, error, fetchFilteredDishes }
}
