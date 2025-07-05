import { useCustomer } from '@/shared/hooks/customer/useCustomer'
import { Customer } from '@/shared/types/customer'
import { useEffect, useState } from 'react'
import { DataTable } from '../DataTable'
import { getColumns } from './columns'
import CustomerCreateButton from './CustomerCreateButton'

export default function CustomerTable() {
  const customerData = useCustomer()
  const [data, setData] = useState(customerData.data || [])

  useEffect(() => {
    setData(customerData.data || [])
  }, [customerData.data])

  function handleDelete(customerToDelete: Customer) {
    setData(prev => prev.filter(customer => customer.id !== customerToDelete.id))
  }

  function handleEdit(updatedCustoemr: Customer) {
    setData(prev => prev.map(f => (f.id === updatedCustoemr.id ? updatedCustoemr : f)))
  }
  function handleCreate(newCustomer: Customer) {
    setData(prev => [...prev, newCustomer])
  }
  const columns = getColumns(handleDelete, handleEdit)
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-end mb-4">
        <CustomerCreateButton onCreate={handleCreate} />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
