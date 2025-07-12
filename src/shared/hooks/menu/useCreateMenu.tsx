import { useCallback, useMemo } from 'react'
import { menuService } from '../../services/menu/menu'
import { CreateMenuRequest } from '../../types/menu'

export function useCreateMenu() {
  const createMenu = useCallback(async (request?: CreateMenuRequest) => {
    if (!request) return

    await menuService
      .createMenu(request)
      .then(response => {})
      .catch(error => {})
  }, [])

  return useMemo(() => {
    return createMenu
  }, [createMenu])
}
