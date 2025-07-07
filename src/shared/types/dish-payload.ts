export interface DishPayload {
  name: string
  description: string
  foods: {
    foodId: number
    quantity: number
  }[]
}
