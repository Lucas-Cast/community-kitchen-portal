import { customerService } from '@/shared/services/customer/customer'
import { useEffect, useState } from 'react'

export function useAverageCustomerAge() {
  const [averageAge, setAverageAge] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  async function fetchAverageAge() {
    try {
      setLoading(true)
      const age = await customerService.getAverageAge()
      setAverageAge(age)
    } catch (err) {
      console.error('Erro ao buscar idade média dos clientes:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAverageAge()
  }, [])

  return {
    averageAge,
    loading,
    refetch: fetchAverageAge,
  }
}
