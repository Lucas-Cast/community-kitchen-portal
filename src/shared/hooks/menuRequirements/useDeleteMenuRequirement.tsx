import { useState } from 'react'
import { menuRequirementService } from '@/shared/services/menuRequirement/menuRequirement'
import { toast } from 'sonner'

export function useDeleteMenuRequirement(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete(id: number) {
    try {
      setLoading(true)
      await menuRequirementService.deleteMenuRequirement(id)
      toast.success('Requisito removido com sucesso!')
      onSuccess?.()
    } catch (err: any) {
      console.error(err)
      if (err?.response?.status === 400) {
        toast.error('Não é possível remover: o requisito ainda está ativo.')
      } else {
        toast.error('Erro ao remover o requisito.')
      }
      setError(err?.message || 'Erro inesperado')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { deleteMenuRequirement: handleDelete, loading, error }
}
