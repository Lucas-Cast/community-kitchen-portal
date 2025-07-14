import { useCallback, useEffect, useMemo, useState } from 'react'
import { dishService } from '../../services/dish/dish'
import { Dish } from '../../types/dish'
import { toast } from 'sonner'

function getErrorMessage(err: any): string {
  return err?.response?.data?.message || err?.message || 'Erro desconhecido.'
}

export function useDishes() {
  const [data, setData] = useState<Dish[] | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const fetchDishes = useCallback(async () => {
    setIsLoading(true)
    setError(undefined)

    return dishService
      .getDishes()
      .then(response => {
        setData(response)
      })
      .catch(error => {
        const message = getErrorMessage(error)
        toast.error(`Erro ao buscar pratos: ${message}`)

        setError(message)
        setData(undefined)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchDishes()
  }, [fetchDishes])

  return useMemo(() => {
    return {
      data,
      error,
      isLoading,
      refetch: fetchDishes,
    }
  }, [data, error, isLoading, fetchDishes])
}
