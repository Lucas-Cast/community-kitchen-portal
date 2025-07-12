import { useCallback, useEffect, useMemo, useState } from 'react'
import { MenuRequirement } from '@/shared/types/menu-requirement'
import { menuRequirementService } from '@/shared/services/menuRequirement/menuRequirement'

export function useMenuRequirements() {
  const [menuRequirementData, setmenuRequirement] = useState<{
    data: MenuRequirement[] | undefined
    error: string | undefined
    isLoading: boolean
  }>({
    data: undefined,
    error: undefined,
    isLoading: false,
  })

  const fetchMenuRequirements = useCallback(async () => {
    setmenuRequirement(prev => ({ ...prev, isLoading: true }))
    await menuRequirementService
      .getMenuRequirements()
      .then(response => {
        setmenuRequirement({
          data: response,
          error: undefined,
          isLoading: false,
        })
      })
      .catch(error => {
        setmenuRequirement({
          data: undefined,
          error: error.message ?? 'Erro ao buscar requisitos do menu',
          isLoading: false,
        })
      })
  }, [])

  useEffect(() => {
    fetchMenuRequirements()
  }, [fetchMenuRequirements])

  return useMemo(() => {
    return menuRequirementData
  }, [menuRequirementData])
}
