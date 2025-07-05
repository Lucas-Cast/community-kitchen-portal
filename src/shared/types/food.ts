import { NutritionFacts } from './nutrition-facts'

export interface Food {
  quantity: number
  id: number
  name: string
  nutritionFacts: NutritionFacts
}
