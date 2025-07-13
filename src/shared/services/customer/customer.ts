import { createAxiosClient } from '@/shared/factories/axios-client'
import { environment } from '@/environment'
import { AxiosInstance } from 'axios'
import { Routes } from '@/shared/enums/routes'
import { Customer } from '@/shared/types/customer'
import { MostFrequentCustomer } from '@/shared/types/most-frequent-customer'

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
    return await this.client
      .post<Customer>(Routes.LIST_CUSTOMERS, customer)
      .then(res => res.data)
      .catch(err => {
        console.error('Error creating customer:', err)
        throw err
      })
  }

  async getAverageAge(): Promise<number> {
    return await this.client
      .get<{ averageAge: number }>(`${Routes.LIST_CUSTOMERS}/average/age`)
      .then(res => res.data.averageAge)
      .catch(err => {
        console.error('Error fetching average age:', err)
        throw err
      })
  }

  async getTopCustomers(page = 1, limit = 10): Promise<MostFrequentCustomer[]> {
    return await this.client
      .get<MostFrequentCustomer[]>(`${Routes.LIST_CUSTOMERS}/filter/mostFrequent`, {
        params: { page, limit },
      })
      .then(res => res.data)
      .catch(err => {
        console.error('Error fetching top customers:', err)
        throw err
      })
  }
}

export const customerService = new CustomerService()
export default CustomerService
