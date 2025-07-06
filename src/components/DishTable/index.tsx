import { useDishes } from '@/shared/hooks/dishes/useDishes'
import { DataTable } from '../DataTable'
import { getColumns } from './columns'
import { useEffect, useOptimistic, useState } from 'react'
import { Dish } from '@/shared/types/dish'

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
  
    const columns = getColumns(handleDelete, handleEdit)

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}