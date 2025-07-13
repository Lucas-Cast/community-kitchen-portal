import { createAxiosClient } from '@/shared/factories/axios-client'
import { environment } from '@/environment'
import { AxiosInstance } from 'axios'
import { Routes } from '@/shared/enums/routes'
import { CreateMenuAttendanceRequest } from '@/shared/types/menu-attendance'

class MenuAttendanceService {
  private readonly client: AxiosInstance

  constructor() {
    this.client = createAxiosClient(environment.ckApiUri)
  }

  async createMenuAttendance(request: CreateMenuAttendanceRequest) {
    return await this.client
      .post(Routes.MENU_ATTENDANCE, request)
      .then(res => res.data)
      .catch(err => {
        console.log('Error creating menu attendance:', err)
        throw err
      })
  }
}
export const menuAttendanceService = new MenuAttendanceService()
export default MenuAttendanceService
