import { useCallback, useEffect, useMemo, useState } from 'react'
import { dishService } from '../../services/dish/dish'
import { Dish } from '../../types/dish'

export function useDishes() {
  const [dishData, setDishData] = useState<{
    data: Dish[] | undefined
    error: string | undefined
    isLoading: boolean
  }>({
    data: undefined,
    error: undefined,
    isLoading: false,
  })

  const fetchDishes = useCallback(async () => {
    setDishData(prev => ({ ...prev, isLoading: true }))
    await dishService
      .getDishes()
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
          error: error.message ?? 'Erro ao buscar pratos',
          isLoading: false,
        })
      })
  }, [])

  useEffect(() => {
    fetchDishes()
  }, [fetchDishes])

  return useMemo(() => {
    return dishData
  }, [dishData])
}
