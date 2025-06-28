import { DailyEvent } from './daily-event'
import { Dish } from './dish'
import { WeekDay } from '../enums/week-days'

export interface WeeklyMenu {
  id: number
  deactivationDate: string | null
  activationDate: string
  availableDay: string
  createdBy: string
  dishes: Dish[]
  dailyEvent: DailyEvent
}

export type WeeklyMenuResponse = Record<WeekDay, WeeklyMenu[]>
