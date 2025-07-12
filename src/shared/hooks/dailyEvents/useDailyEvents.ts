import { useCallback, useEffect, useMemo, useState } from 'react'
import { dailyEventService } from '@/shared/services/dailyEvent/dailyEvent'
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
    try {
      const response = await dailyEventService.getDailyEvents()
      setDailyEventData({
        data: response,
        error: undefined,
        isLoading: false,
      })
    } catch (error: any) {
      setDailyEventData({
        data: undefined,
        error: error.message ?? 'Erro ao carregar eventos diários',
        isLoading: false,
      })
      console.error(error)
    }
  }, [])

  useEffect(() => {
    fetchDailyEvents()
  }, [fetchDailyEvents])

  return useMemo(() => {
    return dailyEventData
  }, [dailyEventData])
}
