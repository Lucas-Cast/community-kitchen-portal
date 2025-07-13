import { createAxiosClient } from '@/shared/factories/axios-client'
import { environment } from '@/environment'
import { CreateMenuRequest, Menu, WeeklyMenuResponse } from '@/shared/types/menu'
import { AxiosInstance } from 'axios'
import { Routes } from '@/shared/enums/routes'

class MenuService {
  private readonly client: AxiosInstance

  constructor() {
    this.client = createAxiosClient(environment.ckApiUri)
  }

  async getMenus(): Promise<Menu[]> {
    return await this.client
      .get<Menu[]>(Routes.MENUS)
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
  async createMenu(request: CreateMenuRequest) {
    return await this.client
      .post(Routes.MENUS, request)
      .then(res => res.data)
      .catch(err => {
        console.log('Error creating menu:', err)
        throw err
      })
  }

  async updateMenu(id: number, request: CreateMenuRequest) {
    return await this.client
      .put(`${Routes.MENUS}/${id}`, request)
      .then(res => res.data)
      .catch(err => {
        console.log('Error updating menu:', err)
        throw err
      })
  }
}
export const menuService = new MenuService()
export default MenuService
