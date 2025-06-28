import { Food } from './food'

export interface Dish {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
  foods: Food[]
}
