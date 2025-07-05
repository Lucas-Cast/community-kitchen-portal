import { useCustomer } from '@/shared/hooks/customer/useCustomer'
import { Customer } from '@/shared/types/customer'
import { useEffect, useState } from 'react'
import { DataTable } from '../DataTable'
import { getColumns } from './columns'
import CustomerCreateButton from './CustomerCreateButton'
import { useAverageCustomerAge } from '@/shared/hooks/customer/useAverageCustomerAge'
import { AverageCustomerAgeCard } from './AverageCustomerAgeCard'

export default function CustomerTable() {
  const customerData = useCustomer()
  const [data, setData] = useState<Customer[]>(customerData.data || [])
  const { averageAge, loading, refetch } = useAverageCustomerAge()

  useEffect(() => {
    setData(customerData.data || [])
  }, [customerData.data])

  function handleDelete(customerToDelete: Customer) {
    setData(prev => prev.filter(customer => customer.id !== customerToDelete.id))
    refetch()
  }

  function handleEdit(updatedCustomer: Customer) {
    setData(prev => prev.map(f => (f.id === updatedCustomer.id ? updatedCustomer : f)))
  }

  function handleCreate(newCustomer: Customer) {
    setData(prev => [...prev, newCustomer])
    refetch()
  }

  const columns = getColumns(handleDelete, handleEdit)

  return (
    <div className="container mx-auto py-5 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <AverageCustomerAgeCard averageAge={averageAge} loading={loading} />
        <CustomerCreateButton onCreate={handleCreate} />
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}
