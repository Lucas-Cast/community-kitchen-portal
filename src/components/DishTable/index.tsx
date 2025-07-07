import { useDishes } from '@/shared/hooks/dishes/useDishes'
import { DataTable } from '../DataTable'
import { getColumns } from './columns'
import { useEffect, useOptimistic, useState } from 'react'
import { Dish } from '@/shared/types/dish'
import DishCreateButton from './DishCreateButton'

export default function DishTable() {
  const dishData = useDishes()
  const [data, setData] = useState(dishData.data || [])

  useEffect(() => {
    setData(dishData.data || [])
  }, [dishData.data])

  function handleDelete(dishToDelete: Dish) {
    setData(prev => prev.filter(dish => dish.id !== dishToDelete.id))
  }

  function handleEdit(updatedDish: Dish) {
    setData(prev => prev.map(f => (f.id === updatedDish.id ? updatedDish : f)))
  }

  function handleCreate(newDish: Dish) {
    setData(prev => [...prev, newDish])
  }

  const columns = getColumns(handleDelete, handleEdit)

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-end mb-4">
        <DishCreateButton onCreate={handleCreate} />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
