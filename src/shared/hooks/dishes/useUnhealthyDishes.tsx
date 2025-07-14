import { useCallback, useEffect, useMemo, useState } from 'react'
import { dishService } from '../../services/dish/dish'
import { Dish } from '../../types/dish'

export function useUnhealthyDishes() {
  const [dishData, setDishData] = useState<{
    data: Dish[] | undefined
    error: string | undefined
    isLoading: boolean
  }>({
    data: undefined,
    error: undefined,
    isLoading: false,
  })

  const fetchUnhealthyDishes = useCallback(async () => {
    setDishData(prev => ({ ...prev, isLoading: true }))
    await dishService
      .getUnhealthyDishes()
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
          error: error.message ?? 'Erro ao buscar pratos não saudáveis',
          isLoading: false,
        })
      })
  }, [])

  useEffect(() => {
    fetchUnhealthyDishes()
  }, [fetchUnhealthyDishes])

  return useMemo(() => {
    return {
      ...dishData,
      refetch: fetchUnhealthyDishes,
    }
  }, [dishData, fetchUnhealthyDishes])
}
