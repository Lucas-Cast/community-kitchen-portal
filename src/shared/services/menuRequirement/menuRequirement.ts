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

async createMenuRequirements(menuRequirement: Partial<MenuRequirement>): Promise<MenuRequirement> {
  return await this.client
    .post<MenuRequirement>(Routes.LIST_MENU_REQUIREMENTS, menuRequirement)
    .then(res => res.data)
    .catch(err => {
      console.error('Error creating menu requirements:', err)
      throw err
    })
  }

  async deactivateMenuRequirement(id: number): Promise<MenuRequirement> {
    return await this.client
      .patch<MenuRequirement>(`${Routes.LIST_MENU_REQUIREMENTS}/${id}/deactivate`)
      .then(res => res.data)
      .catch(err => {
        console.error(`Error deactivating menu requirement ${id}:`, err)
        throw err
      })
  }

  async deleteMenuRequirement(id: number): Promise<void> {
    return await this.client
      .delete(`${Routes.LIST_MENU_REQUIREMENTS}/${id}`)
      .then(() => void 0)
      .catch(err => {
        console.error(`Error deleting menu requirement ${id}:`, err)
        throw err
      })
  }

}

export const menuRequirementService = new MenuRequirementService()
export default MenuRequirementService
