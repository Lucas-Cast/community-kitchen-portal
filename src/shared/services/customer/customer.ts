import { createAxiosClient } from '@/shared/factories/axios-client'
import { environment } from '@/environment'
import { AxiosInstance } from 'axios'
import { Routes } from '@/shared/enums/routes'
import { Customer } from '@/shared/types/customer'

class CustomerService {
  private readonly client: AxiosInstance

  constructor() {
    this.client = createAxiosClient(environment.ckApiUri)
  }

  async getCustomers(): Promise<Customer[]> {
    return await this.client
      .get<Customer[]>(Routes.LIST_CUSTOMERS)
      .then(res => res.data)
      .catch(err => {
        console.error('Error fetching customers:', err)
        throw err
      })
  }

  async create(customer: Partial<Customer>): Promise<Customer> {
    const response = await this.client.post<Customer>('/customers', customer)
    return response.data
  }
  async getAverageAge(): Promise<number> {
    const response = await this.client.get<{ averageAge: number }>('/customers/average/age')
    return response.data.averageAge
  }
}

export const customerService = new CustomerService()
export default CustomerService
