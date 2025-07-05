import { DataTable } from '../DataTable'
import { useEffect, useState } from 'react'
import { getColumns } from './columns'
import { Food } from '@/shared/types/food'
import { useFoods } from '@/shared/hooks/foods/useFoods'
import FoodCreateButton from './FoodCreateButton'

export default function FoodTable() {
  const foodData = useFoods()
  const [data, setData] = useState(foodData.data || [])

  useEffect(() => {
    setData(foodData.data || [])
  }, [foodData.data])

  function handleDelete(foodToDelete: Food) {
    setData(prev => prev.filter(food => food.id !== foodToDelete.id))
  }

  function handleEdit(updatedFood: Food) {
    setData(prev => prev.map(f => (f.id === updatedFood.id ? updatedFood : f)))
  }
  function handleCreate(newFood: Food) {
    setData(prev => [...prev, newFood])
  }

  const columns = getColumns(handleDelete, handleEdit)

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-end mb-4">
        <FoodCreateButton onCreate={handleCreate} />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
