import { useCallback, useMemo } from 'react'
import { menuAttendanceService } from '@/shared/services/menu-attendance/menu-attendance'
import { CreateMenuAttendanceRequest } from '@/shared/types/menu-attendance'

export function useUpsertAttendance() {
  const createAttendance = useCallback(async (request?: CreateMenuAttendanceRequest) => {
    if (!request) return

    await menuAttendanceService
      .createMenuAttendance(request)
      .then(response => {
        console.log('Attendance created successfully:', response)
        return response
      })
      .catch(error => {
        console.log('Error creating attendance:', error)
        throw error
      })
  }, [])

  return useMemo(() => {
    return { createAttendance }
  }, [createAttendance])
}
