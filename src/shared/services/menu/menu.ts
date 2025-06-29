import { createAxiosClient } from '@/shared/factories/axios-client'
import { environment } from '@/environment'
import { Menu, WeeklyMenuResponse } from '@/shared/types/menu'
import { AxiosInstance } from 'axios'
import { Routes } from '@/shared/enums/routes'

class MenuService {
  private readonly client: AxiosInstance

  constructor() {
    this.client = createAxiosClient(environment.ckApiUri)
  }

  async getMenus(): Promise<Menu[]> {
    return await this.client
      .get<Menu[]>(Routes.LIST_MENUS)
      .then(res => res.data)
      .catch(err => {
        console.error('Error fetching menus:', err)
        throw err
      })
  }

  async getWeeklyMenus(): Promise<WeeklyMenuResponse> {
    return await this.client
      .get<WeeklyMenuResponse>(Routes.LIST_WEEKLY_MENUS)
      .then(res => res.data)
      .catch(err => {
        console.error('Error fetching weekly menus:', err)
        throw err
      })
  }
}
export const menuService = new MenuService()
export default MenuService
