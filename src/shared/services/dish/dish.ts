import { createAxiosClient } from '@/shared/factories/axios-client'
import { environment } from '@/environment'
import { Dish } from '@/shared/types/dish'
import { AxiosInstance } from 'axios'
import { Routes } from '@/shared/enums/routes'
import { DishPayload } from '@/shared/types/dish-payload'

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
}

export const dishService = new DishService()
export default DishService
