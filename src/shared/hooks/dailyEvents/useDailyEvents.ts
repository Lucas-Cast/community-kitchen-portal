import { useState, useEffect } from 'react'
import { dailyEventService } from '@/shared/services/dailyEvent/dailyEvent'
import { DailyEvent } from '@/shared/types/daily-event'

export function useDailyEvents() {
  const [data, setData] = useState<DailyEvent[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const response = await dailyEventService.getDailyEvents()
        setData(response)
      } catch (err) {
        setError('Erro ao carregar eventos diários')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return { data, isLoading, error }
}