import { useCallback, useEffect, useMemo, useState } from 'react'
import { dishService } from '../../services/dish/dish'
import { Dish } from '../../types/dish'

export function useHealthyDishes() {
  const [dishData, setDishData] = useState<{
    data: Dish[] | undefined
    error: string | undefined
    isLoading: boolean
  }>({
    data: undefined,
    error: undefined,
    isLoading: false,
  })

  const fetchHealthyDishes = useCallback(async () => {
    setDishData(prev => ({ ...prev, isLoading: true }))
    await dishService
      .getHealthyDishes()
      .then(response => {
        setDishData({
          data: response,
          error: undefined,
          isLoading: false,
        })
      })
      .catch(error => {
        setDishData({
          data: undefined,
          error: error.message ?? 'Erro ao buscar pratos saudáveis',
          isLoading: false,
        })
      })
  }, [])

  useEffect(() => {
    fetchHealthyDishes()
  }, [fetchHealthyDishes])

  return useMemo(() => dishData, [dishData])
}
