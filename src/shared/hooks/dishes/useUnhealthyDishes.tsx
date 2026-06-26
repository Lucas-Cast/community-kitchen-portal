import { getErrorMessage } from '@/shared/utils/get-error-message'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { dishService } from '../../services/dish/dish'
import { Dish } from '../../types/dish'
import { toast } from 'sonner'

export function useUnhealthyDishes() {
  const [data, setData] = useState<Dish[] | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const fetchUnhealthyDishes = useCallback(async () => {
    setIsLoading(true)
    setError(undefined)

    return dishService
      .getUnhealthyDishes()
      .then(response => {
        setData(response)
        return response
      })
      .catch(error => {
        const message = getErrorMessage(error)
        toast.error(`Erro ao buscar pratos não saudáveis: ${message}`)
        setError(message)
        setData(undefined)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchUnhealthyDishes()
  }, [fetchUnhealthyDishes])

  return useMemo(() => {
    return {
      data,
      error,
      isLoading,
      refetch: fetchUnhealthyDishes,
    }
  }, [data, error, isLoading, fetchUnhealthyDishes])
}
