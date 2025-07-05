import { createAxiosClient } from '@/shared/factories/axios-client'
import { environment } from '@/environment'
import { Dish } from '@/shared/types/dish'
import { AxiosInstance } from 'axios'
import { Routes } from '@/shared/enums/routes'
import { UpdateDishPayload } from '@/shared/types/update-dish-payload'

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

  async update(id: number, payload: UpdateDishPayload): Promise<Dish> {
    const response = await this.client.put<Dish>(`/dishes/${id}`, payload)
  return response.data
}
}

export const dishService = new DishService()
export default DishService