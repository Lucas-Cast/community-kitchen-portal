import { useCallback, useEffect, useMemo, useState } from 'react'
import { MenuRequirement } from '../types/menu-requirement'
import { menuRequirementService } from '../services/menuRequirement/menuRequirement'

export function useActiveMenuRequirements() {
  const [menuRequirementData, setmenuRequirement] = useState<{
    data: MenuRequirement[] | undefined
    error: string | undefined
    isLoading: boolean
  }>({
    data: undefined,
    error: undefined,
    isLoading: false,
  })

  const fetchActiveMenuRequirements = useCallback(async () => {
    setmenuRequirement(prev => ({ ...prev, isLoading: true }))
    await menuRequirementService
      .getActiveMenuRequirements()
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
          error: error.message ?? 'Erro ao buscar especificações do menu',
          isLoading: false,
        })
      })
  }, [])

  useEffect(() => {
    fetchActiveMenuRequirements()
  }, [fetchActiveMenuRequirements])

  return useMemo(() => {
    return menuRequirementData
  }, [menuRequirementData])
}
