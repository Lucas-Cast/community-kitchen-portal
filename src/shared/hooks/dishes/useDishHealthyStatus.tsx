import { useState } from 'react'
import { dishService } from '@/shared/services/dish/dish'
import { Dish } from '@/shared/types/dish'
import { toast } from 'sonner'

type DishHealthyResponse = {
  dish: Dish
  healthy: boolean
}

export function useDishHealthyStatus() {
  const [healthyInfo, setHealthyInfo] = useState<DishHealthyResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchHealthyStatus(dishId: number) {
    try {
      setLoading(true)
      setError(null)
      const result = await dishService.getDishHealthyStatus(dishId)
      setHealthyInfo(result)
    } catch (err) {
      console.error(err)
      setError('Erro ao verificar se o prato é saudável.')
      toast.error('Erro ao verificar saúde do prato!')
    } finally {
      setLoading(false)
    }
  }

  return { healthyInfo, fetchHealthyStatus, loading, error }
}
