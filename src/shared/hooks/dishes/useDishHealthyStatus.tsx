import { useCallback, useState } from 'react'
import { dishService } from '@/shared/services/dish/dish'
import { Dish } from '@/shared/types/dish'
import { toast } from 'sonner'

type DishHealthyResponse = {
  dish: Dish
  healthy: boolean
}

function getErrorMessage(err: any): string {
  return err?.response?.data?.message || err?.message || 'Erro desconhecido.'
}

export function useDishHealthyStatus() {
  const [healthyInfo, setHealthyInfo] = useState<DishHealthyResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchHealthyStatus = useCallback(async (dishId: number) => {
    if (!dishId) return

    setLoading(true)
    setError(null)

    return dishService
      .getDishHealthyStatus(dishId)
      .then(result => {
        setHealthyInfo(result)
      })
      .catch(err => {
        const message = getErrorMessage(err)
        setError(message)
        toast.error(`Erro ao verificar saúde do prato: ${message}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { healthyInfo, fetchHealthyStatus, loading, error }
}
