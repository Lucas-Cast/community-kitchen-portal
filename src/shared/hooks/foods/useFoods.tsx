import { foodService } from '@/shared/services/food/food'
import { Food } from '@/shared/types/food'
import { useCallback, useEffect, useMemo, useState } from 'react'

export function useFoods() {
  const [foodData, setFoodData] = useState<{
    data: Food[] | undefined
    error: string | undefined
    isLoading: boolean
  }>({
    data: undefined,
    error: undefined,
    isLoading: false,
  })

  const fetchFoods = useCallback(async () => {
    setFoodData(prev => ({ ...prev, isLoading: true }))
    await foodService
      .getFoods()
      .then(response => {
        setFoodData({
          data: response,
          error: undefined,
          isLoading: false,
        })
      })
      .catch(error => {
        setFoodData({
          data: undefined,
          error: error.message ?? 'Erro ao buscar comidas!',
          isLoading: false,
        })
      })
  }, [])

  useEffect(() => {
    fetchFoods()
  }, [fetchFoods])

  return useMemo(() => {
    return {
      ...foodData,
    }
  }, [foodData])
}
