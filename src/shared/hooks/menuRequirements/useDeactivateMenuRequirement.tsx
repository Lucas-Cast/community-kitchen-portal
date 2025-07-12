import { menuRequirementService } from '@/shared/services/menuRequirement/menuRequirement'
import { MenuRequirement } from '@/shared/types/menu-requirement'
import { useState } from 'react'
import { toast } from 'sonner'

export function useDeactivateMenuRequirement(onSuccess?: (menu: MenuRequirement) => void) {
  const [loading, setLoading] = useState(false)

  async function deactivate(id: number) {
    try {
      setLoading(true)
      const deactivated = await menuRequirementService.deactivateMenuRequirement(id)
      toast.success('Requisitos do menu desativado com sucesso!', {
          id: `deactivate-${id}`,
        })
      onSuccess?.(deactivated)
    } catch (err) {
      toast.error('Erro ao desativar o menu')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return { deactivate, loading }
}
