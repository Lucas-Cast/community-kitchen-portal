import { useMemo } from 'react'
import axios, { AxiosInstance } from 'axios'

//import { useAuthToken } from './useAuthToken'

import { environment } from '@/environment'

export function useApiService(baseUrl: string = environment.ckApiUri): AxiosInstance {
  return useMemo(() => {
    const axiosInstance = axios.create({ baseURL: baseUrl })

    axiosInstance.interceptors.request.use(async config => {
      const token = localStorage.getItem('authToken') ?? sessionStorage.getItem('authToken')
      config.headers.Authorization = `Bearer ${token}`
      return config
    })
    return axiosInstance
  }, [baseUrl])
}
