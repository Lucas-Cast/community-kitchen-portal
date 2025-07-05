import { customerService } from '@/shared/services/customer/customer'
import { Customer } from '@/shared/types/customer'
import { useState } from 'react'
import { toast } from 'sonner'

export function useCreateCustomer(onSuccess?: (customer: Customer) => void) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCreate(customer: Partial<Customer>) {
    try {
      setLoading(true)
      setError(null)
      const newCustomer = await customerService.create(customer)
      onSuccess?.(newCustomer)
      toast.success('Cliente criado com sucesso!')
    } catch (err) {
      console.log(err)
      toast.error('Erro ao criar cliente!')
    } finally {
      setLoading(false)
    }
  }

  return { create: handleCreate, loading, error }
}
