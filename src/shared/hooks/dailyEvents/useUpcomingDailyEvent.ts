
import { useState, useEffect } from 'react'
import { dailyEventService } from '@/shared/services/dailyEvent/dailyEvent'
import { DailyEvent } from '@/shared/types/daily-event'

export function useUpcomingDailyEvents() {
  const [data, setData] = useState<DailyEvent[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      setError(null)
      try {
        const response = await dailyEventService.getUpcomingEventsToday()
        setData(response)
      } catch (err) {
        console.error(err)
        setError('Erro ao carregar eventos restantes do dia')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, isLoading, error }
}
