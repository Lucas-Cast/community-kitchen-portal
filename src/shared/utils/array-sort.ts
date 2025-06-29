import { WeekDay } from '@/shared/enums/week-days'
import { Menu } from '../types/menu'

const WEEK_ORDER = [
  WeekDay.SUNDAY,
  WeekDay.MONDAY,
  WeekDay.TUESDAY,
  WeekDay.WEDNESDAY,
  WeekDay.THURSDAY,
  WeekDay.FRIDAY,
  WeekDay.SATURDAY,
]

export const sortWeekDays = (entries: [string, Menu[]][]) => {
  return entries.sort(([dayA], [dayB]) => {
    const indexA = WEEK_ORDER.indexOf(dayA as WeekDay)
    const indexB = WEEK_ORDER.indexOf(dayB as WeekDay)
    if (indexA === -1) return 1
    if (indexB === -1) return -1

    return indexA - indexB
  })
}
