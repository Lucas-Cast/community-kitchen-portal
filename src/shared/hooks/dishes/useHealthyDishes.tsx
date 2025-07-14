import { useCallback, useEffect, useMemo, useState } from 'react'
import { dishService } from '../../services/dish/dish'
import { Dish } from '../../types/dish'
import { toast } from 'sonner'

function getErrorMessage(err: any): string {
  return err?.response?.data?.message || err?.message || 'Erro desconhecido.'
}

export function useHealthyDishes() {
  const [data, setData] = useState<Dish[] | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const fetchHealthyDishes = useCallback(async () => {
    setIsLoading(true)
    setError(undefined)

    return dishService
      .getHealthyDishes()
      .then(response => {
        setData(response)
        return response
      })
      .catch(error => {
        const message = getErrorMessage(error)
        toast.error(`Erro ao buscar pratos saudáveis: ${message}`)
        setError(message)
        setData(undefined)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchHealthyDishes()
  }, [fetchHealthyDishes])

  return useMemo(() => {
    return {
      data,
      error,
      isLoading,
      refetch: fetchHealthyDishes,
    }
  }, [data, error, isLoading, fetchHealthyDishes])
}
