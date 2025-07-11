import { MenuRequirement } from "./menu-requirement"

export interface DailyEvent {
  id: number
  name: string
  startTime: string
  endTime: string
  requirement: MenuRequirement
}