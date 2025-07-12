import { useCallback, useEffect, useMemo, useState } from 'react'
import { MenuRequirement } from '@/shared/types/menu-requirement'
import { menuRequirementService } from '@/shared/services/menuRequirement/menuRequirement'
import { AxiosError } from 'axios'

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
    setmenuRequirement(prev => ({ ...prev, isLoading: true }));
    try {
      const response = await menuRequirementService.getActiveMenuRequirements();
      setmenuRequirement({
        data: response,
        error: undefined,
        isLoading: false,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof AxiosError
          ? error.message ?? 'Erro ao buscar requisitos do menu'
          : 'Erro ao buscar requisitos do menu'
      setmenuRequirement({
        data: undefined,
        error: errorMessage,
        isLoading: false,
      });
    }
  }, []);

  useEffect(() => {
    fetchActiveMenuRequirements()
  }, [fetchActiveMenuRequirements])

  return useMemo(
    () => ({
      data: menuRequirementData.data,
      error: menuRequirementData.error,
      isLoading: menuRequirementData.isLoading,
      refetch: fetchActiveMenuRequirements,
    }),
    [menuRequirementData, fetchActiveMenuRequirements]
  );
}
