import { useState } from 'react'
import { dailyEventService } from '@/shared/services/dailyEvent/dailyEvent'
import { DailyEvent } from '@/shared/types/daily-event'
import { toast } from 'sonner'

export interface CreateDailyEvent {
  name: string
  startTime: string
  endTime: string
  requirementId: number
}

export function useCreateDailyEvent(onSuccess?: (dailyEvent: DailyEvent) => void) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function create(dailyEvent: CreateDailyEvent) {
    try {
      setLoading(true)
      setError(null)

      const created = await dailyEventService.createDailyEvent(dailyEvent)

      const fullEvent = await dailyEventService.getDailyEventById(created.id)

      onSuccess?.(fullEvent)
      toast.success('Evento diário criado com sucesso!')
    } catch (err) {
      console.error(err)
      toast.error('Erro ao tentar criar evento diário!')
      setError('Erro ao tentar criar evento diário')
    } finally {
      setLoading(false)
    }
  }

  return { create, loading, error }
}