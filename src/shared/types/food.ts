import { NutritionFacts } from './nutrition-facts'

export interface Food {
  id: number
  name: string
  nutritionFacts: NutritionFacts
  quantity: number // em gramas
}
