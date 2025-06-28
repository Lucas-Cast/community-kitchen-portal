import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCkApi } from './useCkApi'
import { Routes } from '../enums/routes'
import { WeeklyMenuResponse } from '../types/weekly-menus'

export function useWeeklyMenus() {
  const { get } = useCkApi()
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
    await get<WeeklyMenuResponse>(Routes.LIST_WEEKLY_MENUS)
      .then(response => {
        setWeeklyMenuData({
          data: response.data,
          error: undefined,
          isLoading: false,
        })
      })
      .catch(error => {
        setWeeklyMenuData({
          data: undefined,
          error: error.message ?? 'Erro ao buscar os menus semanais',
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
