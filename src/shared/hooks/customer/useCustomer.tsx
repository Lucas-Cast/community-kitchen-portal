import { customerService } from '@/shared/services/customer/customer'
import { Customer } from '@/shared/types/customer'
import { useCallback, useEffect, useMemo, useState } from 'react'

export function useCustomer() {
  const [customerData, setCustomerData] = useState<{
    data: Customer[] | undefined
    error: string | undefined
    isLoading: boolean
  }>({
    data: undefined,
    error: undefined,
    isLoading: false,
  })

  const fetchCustomers = useCallback(async () => {
    setCustomerData(prev => ({ ...prev, isLoading: true }))
    await customerService
      .getCustomers()
      .then(response => {
        setCustomerData({
          data: response,
          error: undefined,
          isLoading: false,
        })
      })
      .catch(error => {
        setCustomerData({
          data: undefined,
          error: error.message ?? 'Erro ao buscar comidas!',
          isLoading: false,
        })
      })
  }, [])

  useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  return useMemo(() => {
    return {
      ...customerData,
    }
  }, [customerData])
}
