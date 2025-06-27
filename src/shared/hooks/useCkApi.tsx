import { environment } from '@/environment'
import { useMemo } from 'react'
import { createAxiosClient } from '../factories/axios-client'

export function useCkApi() {
  const axiosInstance = useMemo(() => {
    return createAxiosClient(environment.ckApiUri)
  }, [])

  return axiosInstance
}
