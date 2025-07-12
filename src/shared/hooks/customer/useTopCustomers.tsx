import { useEffect, useState } from 'react'
import { customerService } from '@/shared/services/customer/customer'
import { MostFrequentCustomer } from '@/shared/types/most-frequent-customer'

export function useTopCustomers(page = 1, limit = 10) {
  const [data, setData] = useState<MostFrequentCustomer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchTopCustomers = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await customerService.getTopCustomers(page, limit)
      setData(result)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTopCustomers()
  }, [page, limit])

  return {
    data,
    loading,
    error,
    refetch: fetchTopCustomers,
  }
}
