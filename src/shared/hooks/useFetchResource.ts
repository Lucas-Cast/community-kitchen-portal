// src/shared/hooks/useFetchResource.ts
import { useState, useCallback, useMemo } from 'react'
import { toast } from 'sonner'
import { resourceService } from '../services/resource/resourceService'

type UseFetchResourceOptions<T> = {
  onSuccess?: (data: T) => void
  onError?: (err: unknown) => void
}

export function useFetchResource<T>(options?: UseFetchResourceOptions<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const fetchData = useCallback(
    async (url: string) => {
      setLoading(true)
      setError(null)
      try {
        const result = await resourceService.get<T>(url)
        setData(result)
        options?.onSuccess?.(result)
        return result
      } catch (err) {
        setError(err)
        toast.error('Erro ao buscar recurso.')
        options?.onError?.(err)
      } finally {
        setLoading(false)
      }
    },
    [options]
  )

  return useMemo(
    () => ({ data, loading, error, fetchData, setData }),
    [data, loading, error, fetchData]
  )
}
