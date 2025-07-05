export interface UpdateDishPayload {
  name: string
  description: string
  foods: {
    foodId: number
    quantity: number
  }[]
}