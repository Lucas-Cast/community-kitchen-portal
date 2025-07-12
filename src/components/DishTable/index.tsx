import { useDishes } from '@/shared/hooks/dishes/useDishes'
import { DataTable } from '../DataTable'
import { getColumns } from './columns'
import { useEffect, useState } from 'react'
import { Dish } from '@/shared/types/dish'
import DishCreateButton from './DishCreateButton'
import DishFilterButton from './DishFilterButton'

export default function DishTable() {
  const dishData = useDishes()
  const [data, setData] = useState(dishData.data || [])

  const [filters, setFilters] = useState({
    carbohydrates: '',
    sodium: '',
    calories: '',
    proteins: '',
  })

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

  function applyFilteredDishes(filteredData: Dish[]) {
    setData(filteredData)
  }

  function handleFilterChange(name: string, value: string) {
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const columns = getColumns(handleDelete, handleEdit)

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <DishFilterButton
            filters={filters}
            onChangeFilter={handleFilterChange}
            onApplyFilter={applyFilteredDishes}
          ></DishFilterButton>
        </div>

        <div className="flex justify-end">
          <DishCreateButton onCreate={handleCreate} />
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
