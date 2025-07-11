import { useState } from 'react';
import { dailyEventService } from '@/shared/services/dailyEvent/dailyEvent';
import { DailyEvent } from '@/shared/types/daily-event';
import { DailyEventPayload } from '@/shared/types/daily-event-payload';
import { toast } from 'sonner';

export function useUpdateDailyEvent(onSuccess?: (dailyEvent: DailyEvent) => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function update(id: number, payload: DailyEventPayload) {
    setLoading(true);
    setError(null);

    try {

      await dailyEventService.updateDailyEvent(id, payload);

      const updatedDailyEvent = await dailyEventService.getDailyEventById(id);

      onSuccess?.(updatedDailyEvent);
      toast.success('Evento diário atualizado com sucesso!');
      return updatedDailyEvent;
    } catch (err) {
      console.error('Erro ao atualizar evento diário:', err);
      const errorMessage = 'Erro ao atualizar evento diário!';
      toast.error(errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { update, loading, error };
}
