import { menuRequirementService } from '@/shared/services/menuRequirement/menuRequirement'
import { CreateMenuRequirement, MenuRequirement } from '@/shared/types/menu-requirement'
import { useState } from 'react'
import { toast } from 'sonner'

export function useCreateMenuRequirement(onSuccess?: (menuRequirement: MenuRequirement) => void) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCreate(menuRequirement: CreateMenuRequirement) {
    try {
      setLoading(true)
      setError(null)
      const newMenuRequirement = await menuRequirementService.createMenuRequirements(menuRequirement)
      onSuccess?.(newMenuRequirement)
      toast.success('Menu requirement created!')
    } catch (err) {
      console.log(err)
      toast.error('Error when trying to create a menu requirement!')
    } finally {
      setLoading(false)
    }
  }

  return { create: handleCreate, loading, error }
}
