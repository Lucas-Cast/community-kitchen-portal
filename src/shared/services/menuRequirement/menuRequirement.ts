import { createAxiosClient } from '@/shared/factories/axios-client'
import { environment } from '@/environment'
import { AxiosInstance } from 'axios'
import { Routes } from '@/shared/enums/routes'
import { MenuRequirement } from '@/shared/types/menu-requirement'

class MenuRequirementService {
  private readonly client: AxiosInstance

  constructor() {
    this.client = createAxiosClient(environment.ckApiUri)
  }

  async getActiveMenuRequirements(): Promise<MenuRequirement[]> {
    return await this.client
      .get<MenuRequirement[]>(Routes.LIST_ACTIVE_MENU_REQUIREMENTS)
      .then(res => res.data)
      .catch(err => {
        console.error('Error fetching active menu requirements:', err)
        throw err
      })
  }

    async getMenuRequirements(): Promise<MenuRequirement[]> {
    return await this.client
      .get<MenuRequirement[]>(Routes.LIST_MENU_REQUIREMENTS)
      .then(res => res.data)
      .catch(err => {
        console.error('Error fetching menu requirements:', err)
        throw err
      })
  }

async updateMenuRequirements(id: number, payload: Partial<MenuRequirement>): Promise<MenuRequirement> {
  return await this.client
    .patch<MenuRequirement>(`${Routes.LIST_MENU_REQUIREMENTS}/${id}`, payload)
    .then(res => res.data)
    .catch(err => {
      console.error(`Error updating menu requirements ${id}:`, err)
      throw err
    })
}

async createMenuRequirements(food: Partial<MenuRequirement>): Promise<MenuRequirement> {
  return await this.client
    .post<MenuRequirement>(Routes.LIST_MENU_REQUIREMENTS, food)
    .then(res => res.data)
    .catch(err => {
      console.error('Error creating menu requirements:', err)
      throw err
    })
}

}

export const menuRequirementService = new MenuRequirementService()
export default MenuRequirementService
