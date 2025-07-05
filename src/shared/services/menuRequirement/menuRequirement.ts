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
}

export const menuRequirementService = new MenuRequirementService()
export default MenuRequirementService
