import { createAxiosClient } from '@/shared/factories/axios-client'
import { environment } from '@/environment'
import { AxiosInstance } from 'axios'
import { Routes } from '@/shared/enums/routes'
import { DailyEvent } from '@/shared/types/daily-event'
import { DailyEventPayload } from '@/shared/types/daily-event-payload'

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

  async createDailyEvent(dailyEvent: Partial<DailyEvent>): Promise<DailyEvent> {
    return await this.client
      .post<DailyEvent>(Routes.LIST_DAILY_EVENTS, dailyEvent)
      .then(res => res.data)
      .catch(err => {
        console.error('Error creating daily event:', err)
        throw err
      })
  }

  async getDailyEventById(id: number): Promise<DailyEvent> {
  return await this.client
    .get<DailyEvent>(`${Routes.LIST_DAILY_EVENTS}/${id}`)
    .then(res => res.data)
    .catch(err => {
      console.error('Erro ao buscar evento diário por ID:', err)
      throw err
    })
  }

  async updateDailyEvent(id: number, payload: DailyEventPayload): Promise<DailyEvent> {
    return await this.client
      .put<DailyEvent>(`${Routes.LIST_DAILY_EVENTS}/${id}`, payload)
      .then(res => res.data)
      .catch(err => {
        console.error(`Error updating daily event ${id}:`, err)
        throw err
      })
  }

    async getUpcomingEventsToday(): Promise<DailyEvent[]> {
    return await this.client
      .get<DailyEvent[]>(`${Routes.LIST_DAILY_EVENTS}/upcoming/daily-events`)
      .then(res => res.data)
      .catch(err => {
        console.error('Error to get upcoming daily events', err)
        throw err
      })
  } 
}

export const dailyEventService = new DailyEventService()
export default DailyEventService