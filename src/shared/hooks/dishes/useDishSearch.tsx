import { useState, useCallback } from 'react'
import { dishService } from '@/shared/services/dish/dish'
import { Dish } from '@/shared/types/dish'
import { toast } from 'sonner'

function getErrorMessage(err: any): string {
  return err?.response?.data?.message || err?.message || 'Erro desconhecido.'
}

export function useDishSearch() {
  const [results, setResults] = useState<Dish[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(
    async (term: string, type: 'all' | 'healthy' | 'unhealthy' = 'all') => {
      if (!term.trim()) return

      setLoading(true)
      setError(null)

      return Promise.allSettled([
        dishService.searchDishesByName(term, type),
        dishService.searchDishesByDescription(term, type),
      ])
        .then(resultsSettled => {
          const byName = resultsSettled[0].status === 'fulfilled' ? resultsSettled[0].value : []
          const byDescription =
            resultsSettled[1].status === 'fulfilled' ? resultsSettled[1].value : []

          const combined = [...byName, ...byDescription]
          const uniqueDishes = combined.filter(
            (dish, index, self) => index === self.findIndex(d => d.id === dish.id)
          )

          setResults(uniqueDishes)
          return uniqueDishes
        })
        .catch(err => {
          const message = getErrorMessage(err)
          setError(message)
          toast.error(`Erro ao buscar pratos: ${message}`)
          throw err
        })
        .finally(() => {
          setLoading(false)
        })
    },
    []
  )

  return { search, results, loading, error }
}
