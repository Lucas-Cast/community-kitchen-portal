import { useState } from 'react'
import { dishService } from '@/shared/services/dish/dish'
import { Dish } from '@/shared/types/dish'
import { toast } from 'sonner'

export function useDishSearch() {
  const [results, setResults] = useState<Dish[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function search(term: string) {
    if (!term.trim()) return

    setLoading(true)
    setError(null)

    try {
      const [byNameResult, byDescriptionResult] = await Promise.allSettled([
        dishService.searchDishesByName(term),
        dishService.searchDishesByDescription(term),
      ])

      const byName = byNameResult.status === 'fulfilled' ? byNameResult.value : []
      const byDescription =
        byDescriptionResult.status === 'fulfilled' ? byDescriptionResult.value : []

      const combined = [...byName, ...byDescription]
      const uniqueDishes = combined.filter(
        (dish, index, self) => index === self.findIndex(d => d.id === dish.id)
      )

      setResults(uniqueDishes)
    } catch (err) {
      console.error(err)
      setError('Erro ao buscar pratos.')
      toast.error('Erro ao buscar pratos.')
    } finally {
      setLoading(false)
    }
  }

  return { search, results, loading, error }
}
