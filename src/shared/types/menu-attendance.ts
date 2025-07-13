export interface MenuAttendance {
  id: number
  menuId: number
  customerName: string
  weekDay: string
  attendDate: string
}

export interface CreateMenuAttendanceRequest {
  menuId: number
  customerId: number
}
