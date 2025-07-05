import { DailyEvent } from './daily-event'

export interface MenuRequirement {
  id: number
  minCalories: number
  maxCalories: number
  minCarbohydrates: number
  maxCarbohydrates: number
  minProteins: number
  maxProteins: number
  minFats: number
  maxFats: number
  minFiber: number
  maxFiber: number
  minSugar: number
  maxSugar: number
  minSodium: number
  maxSodium: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  dailyEvent: DailyEvent[]
}
