import { createAxiosClient } from '@/shared/factories/axios-client'
import { environment } from '@/environment'
import { AxiosInstance } from 'axios'

class ResourceService {
  private readonly client: AxiosInstance

  constructor() {
    this.client = createAxiosClient(environment.ckApiUri)
  }

  async delete<T = unknown>(url: string): Promise<T> {
    return await this.client
      .delete<T>(url)
      .then(res => res.data)
      .catch(err => {
        console.error('Erro ao deletar recurso:', err)
        throw err
      })
  }
}

export const resourceService = new ResourceService()
export default ResourceService
