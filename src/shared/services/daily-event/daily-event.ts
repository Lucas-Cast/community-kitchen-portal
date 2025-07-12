import { createAxiosClient } from '@/shared/factories/axios-client'
import { environment } from '@/environment'
import { Menu, WeeklyMenuResponse } from '@/shared/types/menu'
import { AxiosInstance } from 'axios'
import { Routes } from '@/shared/enums/routes'
import { DailyEvent } from '@/shared/types/daily-event'

class DailyEventService {
  private readonly client: AxiosInstance

  constructor() {
    this.client = createAxiosClient(environment.ckApiUri)
  }

  async getDailyEvents(): Promise<DailyEvent[]> {
    return await this.client
      .get<DailyEvent[]>(Routes.LIST_DAILY_EVENTS)
      .then(res => res.data)
      .catch(err => {
        console.error('Error fetching daily events:', err)
        throw err
      })
  }
}
export const dailyEventService = new DailyEventService()
export default DailyEventService
