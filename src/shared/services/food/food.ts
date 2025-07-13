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
  async update(id: number, payload: Partial<Food>): Promise<Food> {
    const response = await this.client.put<Food>(`/foods/${id}`, payload)
    return response.data
  }

  async create(food: Partial<Food>): Promise<Food> {
    const response = await this.client.post<Food>('/foods', food)
    return response.data
  }

  async searchFoodsByName(name: string): Promise<Food[]> {
    return await this.client
      .get<Food[]>(`${Routes.LIST_FOODS}/foods-by-name/${encodeURIComponent(name)}`)
      .then(res => res.data)
      .catch(err => {
        if (err.response?.status === 404) {
          return [];
        }
        console.error(`Error searching foods by name "${name}":`, err);
        throw err;
      });
  }

  async findFoodsByMaxNutrientAmount(maxNutrientAmount: number, nutrient: string): Promise<Food[]> {
    return this.client
      .get<Food[]>(`${Routes.LIST_FOODS}/foods-by-max-sugar-amount/${maxNutrientAmount}?nutrient=${nutrient}`)
      .then(res => res.data)
      .catch(err => {
        if (err.response?.status === 404) return [];
        console.error(`Error fetching foods by max ${nutrient}:`, err);
        throw err;
      });
  }

  async findFoodsByMinNutrientAmount(minNutrientAmount: number, nutrient: string): Promise<Food[]> {
    return this.client
      .get<Food[]>(`${Routes.LIST_FOODS}/foods-by-min-nutrient-amount/${minNutrientAmount}?nutrient=${nutrient}`)
      .then(res => res.data)
      .catch(err => {
        if (err.response?.status === 404) return [];
        console.error(`Error fetching foods by min ${nutrient}:`, err);
        throw err;
      });
  }

  async getMostCaloricFoods(page: number = 1, limit: number = 10): Promise<Food[]> {
    return this.client
      .get<Food[]>(`${Routes.LIST_FOODS}/filter/most-caloric?page=${page}&limit=${limit}`)
      .then(res => res.data)
      .catch(err => {
        console.error('Error fetching most caloric foods:', err);
        throw err;
      });
  }

}

export const foodService = new FoodService()
export default FoodService
