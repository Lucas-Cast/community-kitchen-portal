import { useCallback, useEffect, useMemo, useState } from 'react'
import { WeeklyMenuResponse } from '../types/menu'
import { menuService } from '../services/menu/menu'

export function useWeeklyMenus() {
  const [weeklyMenuData, setWeeklyMenuData] = useState<{
    data: WeeklyMenuResponse | undefined
    error: string | undefined
    isLoading: boolean
  }>({
    data: undefined,
    error: undefined,
    isLoading: false,
  })

  const fetchWeeklyMenus = useCallback(async () => {
    setWeeklyMenuData(prev => ({ ...prev, isLoading: true }))
    await menuService
      .getWeeklyMenus()
      .then(response => {
        setWeeklyMenuData({
          data: response,
          error: undefined,
          isLoading: false,
        })
      })
      .catch(error => {
        setWeeklyMenuData({
          data: undefined,
          error: error.message ?? 'Erro ao buscar menus semanais',
          isLoading: false,
        })
      })
  }, [])

  useEffect(() => {
    fetchWeeklyMenus()
  }, [fetchWeeklyMenus])

  return useMemo(() => {
    return weeklyMenuData
  }, [weeklyMenuData])
}

