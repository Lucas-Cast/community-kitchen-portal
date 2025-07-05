import { NutritionFacts } from './nutrition-facts'

export interface Food {
  quantity: any
  id: number
  name: string
  nutritionFacts: NutritionFacts
}
