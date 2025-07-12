import { useCallback, useEffect, useMemo, useState } from 'react'
import { dailyEventService } from '@/shared/services/dailyEvent/dailyEvent'
import { DailyEvent } from '@/shared/types/daily-event'
import { AxiosError } from 'axios'

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
    } catch (error: unknown) {
      const errorMessage =
        error instanceof AxiosError
          ? error.message ?? 'Erro ao carregar eventos diários'
          : 'Erro ao carregar eventos diários';
      setDailyEventData({
        data: undefined,
        error: errorMessage,
        isLoading: false,
      });
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
