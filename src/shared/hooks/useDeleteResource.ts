import { useState, useCallback, useMemo } from 'react'
import { toast } from 'sonner'
import { resourceService } from '../services/resource/resourceService'

type UseDeleteResourceOptions<T> = {
  getUrl: (data: T) => string
  onSuccess?: () => void
  onError?: (err: unknown) => void
}

export function useDeleteResource<T>({
  getUrl,
  onSuccess,
  onError,
}: UseDeleteResourceOptions<T>) {
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteItem = useCallback(
    async (data: T) => {
      try {
        setIsDeleting(true)
        const url = getUrl(data)
        await resourceService.delete(url)
        toast.success('Item deletado com sucesso!')
        onSuccess?.()
      } catch (err: any) {
        toast.error('Erro ao deletar item.')
        onError?.(err)
      } finally {
        setIsDeleting(false)
      }
    },
    [getUrl, onSuccess, onError]
  )

  return useMemo(
    () => ({ deleteItem, isDeleting }),
    [deleteItem, isDeleting]
  )
}
