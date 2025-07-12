import { Food } from './food'
import { NutritionFacts } from './nutrition-facts'

export type DishNutritionSummary = {
  id: number
  name: string
  description: string
  nutritionFacts: NutritionFacts
  foods: Food[]
}
