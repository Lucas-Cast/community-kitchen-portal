import { DailyEvent } from './daily-event'
import { Dish } from './dish'
import { WeekDay } from '../enums/week-days'

export interface Menu {
  id: number
  deactivationDate: string | null
  activationDate: string
  availableDay: string
  createdBy: string
  dishes: Dish[]
  dailyEvent: DailyEvent
}

export interface CreateMenuRequest {
  availableDay: string
  dishes: number[]
  dailyEventId: number
  activationDate: string
}

export type WeeklyMenuResponse = Record<WeekDay, Menu[]>
