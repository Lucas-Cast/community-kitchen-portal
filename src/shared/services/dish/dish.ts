import { createAxiosClient } from '@/shared/factories/axios-client'
import { environment } from '@/environment'
import { Dish } from '@/shared/types/dish'
import { AxiosInstance } from 'axios'
import { Routes } from '@/shared/enums/routes'
import { DishPayload } from '@/shared/types/dish-payload'
import { DishNutritionSummary } from '@/shared/types/dish-nutrition-summary'

class DishService {
  private readonly client: AxiosInstance

  constructor() {
    this.client = createAxiosClient(environment.ckApiUri)
  }

  async getDishes(): Promise<Dish[]> {
    return await this.client
      .get<Dish[]>(Routes.LIST_DISHES)
      .then(res => res.data)
      .catch(err => {
        console.error('Error fetching dishes:', err)
        throw err
      })
  }

  async updateDish(id: number, payload: DishPayload): Promise<Dish> {
    return await this.client
      .put<Dish>(`${Routes.LIST_DISHES}/${id}`, payload)
      .then(res => res.data)
      .catch(err => {
        console.error('Error updating dish:', err)
        throw err
      })
  }

  async createDish(payload: DishPayload): Promise<Dish> {
    return await this.client
      .post<Dish>(Routes.LIST_DISHES, payload)
      .then(res => res.data)
      .catch(err => {
        console.error('Error creating dish:', err)
        throw err
      })
  }

  async getFilteredDishes(filters: {
    carbohydrates?: number
    sodium?: number
    calories?: number
    proteins?: number
    limit?: number
    offset?: number
  }): Promise<Dish[]> {
    const params = new URLSearchParams()
    if (filters.carbohydrates !== undefined)
      params.append('carbohydrates', filters.carbohydrates.toString())
    if (filters.sodium !== undefined) params.append('sodium', filters.sodium.toString())
    if (filters.calories !== undefined) params.append('calories', filters.calories.toString())
    if (filters.proteins !== undefined) params.append('proteins', filters.proteins.toString())
    if (filters.limit !== undefined) params.append('limit', filters.limit.toString())
    if (filters.offset !== undefined) params.append('offset', filters.offset.toString())

    return this.client
      .get<Dish[]>(`/dishes/filtered/by-parameter?${params.toString()}`)
      .then(res => res.data)
      .catch(err => {
        console.error('Error fetching filtered dishes:', err)
        throw err
      })
  }
}

export const dishService = new DishService()
export default DishService
