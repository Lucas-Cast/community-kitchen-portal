import { useCallback, useEffect, useMemo, useState } from 'react'
import { dailyEventService } from '@/shared/services/daily-event/daily-event'
import { DailyEvent } from '@/shared/types/daily-event'

export function useDailyEvents() {
  const [dailyEventData, setDailyEventData] = useState<{
    data: DailyEvent[] | undefined
    error: string | undefined
    isLoading: boolean
  }>({
    data: undefined,
    error: undefined,
    isLoading: false,
  })

  const fetchDailyEvents = useCallback(async () => {
    setDailyEventData(prev => ({ ...prev, isLoading: true }))
    await dailyEventService
      .getDailyEvents()
      .then(response => {
        setDailyEventData({
          data: response,
          error: undefined,
          isLoading: false,
        })
      })
      .catch(error => {
        setDailyEventData({
          data: undefined,
          error: error.message ?? 'Erro ao buscar refeições',
          isLoading: false,
        })
      })
  }, [])

  useEffect(() => {
    fetchDailyEvents()
  }, [fetchDailyEvents])

  return useMemo(() => {
    return dailyEventData
  }, [dailyEventData])
}
