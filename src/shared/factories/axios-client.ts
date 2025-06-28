import axios, { AxiosInstance } from 'axios'
import Cookies from 'js-cookie'

export function createAxiosClient(baseUrl: string): AxiosInstance {
  const axiosInstance = axios.create({ baseURL: baseUrl })

  axiosInstance.interceptors.request.use(async config => {
    const token = Cookies.get('authToken')
    config.headers.Authorization = `Bearer ${token}`
    return config
  })

  return axiosInstance
}
