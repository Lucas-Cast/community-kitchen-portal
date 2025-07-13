import { useTopCustomers } from '@/shared/hooks/customer/useTopCustomers'
import { useEffect, useState } from 'react'
import { MostFrequentCustomer } from '@/shared/types/most-frequent-customer'
import { DataTable } from '../DataTable'
import { getColumns } from './columns'

export default function CustomersMostFrequentTable() {
  const topCustomersData = useTopCustomers()
  const [data, setData] = useState<MostFrequentCustomer[]>(topCustomersData.data || [])

  useEffect(() => {
    setData(topCustomersData.data || [])
  }, [topCustomersData.data])

  const columns = getColumns()

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Top 10 Clientes Mais Frequentes</h2>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
