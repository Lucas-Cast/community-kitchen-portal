import { useCallback, useEffect, useMemo, useState } from 'react'
import { menuService } from '../services/menu/menu'
import { Menu } from '../types/menu'

export function useMenus() {
  const [menuData, setMenuData] = useState<{
    data: Menu[] | undefined
    error: string | undefined
    isLoading: boolean
  }>({
    data: undefined,
    error: undefined,
    isLoading: false,
  })

  const fetchMenus = useCallback(async () => {
    setMenuData(prev => ({ ...prev, isLoading: true }))
    await menuService
      .getMenus()
      .then(response => {
        setMenuData({
          data: response,
          error: undefined,
          isLoading: false,
        })
      })
      .catch(error => {
        setMenuData({
          data: undefined,
          error: error.message ?? 'Erro ao buscar menus semanais',
          isLoading: false,
        })
      })
  }, [])

  useEffect(() => {
    fetchMenus()
  }, [fetchMenus])

  return useMemo(() => {
    return menuData
  }, [menuData])
}
