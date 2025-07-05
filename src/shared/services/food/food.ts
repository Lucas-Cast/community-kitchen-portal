import { createAxiosClient } from '@/shared/factories/axios-client'
import { environment } from '@/environment'
import { AxiosInstance } from 'axios'
import { Routes } from '@/shared/enums/routes'
import { Food } from '@/shared/types/food'

class FoodService {
  private readonly client: AxiosInstance

  constructor() {
    this.client = createAxiosClient(environment.ckApiUri)
  }

  async getFoods(): Promise<Food[]> {
    return await this.client
      .get<Food[]>(Routes.LIST_FOODS)
      .then(res => res.data)
      .catch(err => {
        console.error('Error fetching foods:', err)
        throw err
      })
  }
}

export const foodService = new FoodService()
export default FoodService