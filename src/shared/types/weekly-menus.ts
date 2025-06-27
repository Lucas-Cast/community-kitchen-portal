import { DailyEvent } from './daily-event'
import { Dish } from './dish'

export interface WeeklyMenu {
  id: number
  deactivationDate: string | null
  activationDate: string
  availableDay: string
  createdBy: string
  dishes: Dish[]
  dailyEvent: DailyEvent
}
