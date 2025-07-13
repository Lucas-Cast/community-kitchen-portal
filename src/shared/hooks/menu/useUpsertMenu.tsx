import { useCallback, useMemo } from 'react'
import { menuService } from '../../services/menu/menu'
import { CreateMenuRequest } from '../../types/menu'

export function useUpsertMenu() {
  const createMenu = useCallback(async (request?: CreateMenuRequest) => {
    if (!request) return

    await menuService
      .createMenu(request)
      .then(response => {})
      .catch(error => {})
  }, [])

  const updateMenu = useCallback(async (id: number, request: CreateMenuRequest) => {
    if (!id || !request) return

    await menuService
      .updateMenu(id, request)
      .then(response => {})
      .catch(error => {})
  }, [])

  return useMemo(() => {
    return { createMenu, updateMenu }
  }, [createMenu, updateMenu])
}
