import { menuRequirementService } from '@/shared/services/menuRequirement/menuRequirement'
import { MenuRequirement } from '@/shared/types/menu-requirement'
import { useState, useCallback } from 'react'
import { toast } from 'sonner'


export function useUpdateMenuRequirement(onSuccess?: () => void, onError?: (err: unknown) => void) {
  const [isUpdating, setIsUpdating] = useState(false)

  const updateMenuRequirement = useCallback(
    async (menuRequirement: MenuRequirement, payload: Partial<MenuRequirement>) => {
      try {
        setIsUpdating(true)
        const updatedMenuRequirement = await menuRequirementService.updateMenuRequirements(menuRequirement.id, payload)
        toast.success('Requisitos do menu atualizado!')
        onSuccess?.()
        return updatedMenuRequirement
      } catch (err) {
        toast.error('Erro ao tentar atualizar requisitos do menu!')
        onError?.(err)
        throw err
      } finally {
        setIsUpdating(false)
      }
    },
    [onSuccess, onError]
  )

  return { updateMenuRequirement, isUpdating }
}
