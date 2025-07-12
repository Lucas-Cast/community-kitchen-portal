import { useDishes } from '@/shared/hooks/dishes/useDishes'
import { useHealthyDishes } from '@/shared/hooks/dishes/useHealthyDishes'
import { useUnhealthyDishes } from '@/shared/hooks/dishes/useUnhealthyDishes'
import { DataTable } from '../DataTable'
import { getColumns } from './columns'
import { useEffect, useState } from 'react'
import { Dish } from '@/shared/types/dish'
import DishCreateButton from './DishCreateButton'
import DishFilterButton from './DishFilterButton'
import SearchBox from '../SearchBox'
import { useDishSearch } from '@/shared/hooks/dishes/useDishSearch'
import DishViewMode from './DishViewMode'

export default function DishTable() {
  const allDishes = useDishes()
  const healthyDishes = useHealthyDishes()
  const unhealthyDishes = useUnhealthyDishes()

  const [viewMode, setViewMode] = useState<'all' | 'healthy' | 'unhealthy'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchActive, setSearchActive] = useState(false)
  const [filters, setFilters] = useState({
    carbohydrates: '',
    sodium: '',
    calories: '',
    proteins: '',
  })

  const { search, results: searchResults, loading: searchLoading } = useDishSearch()

  const [data, setData] = useState<Dish[]>([])

  useEffect(() => {
    if (searchActive) {
      setData(searchResults)
    } else {
      if (viewMode === 'all') {
        setData(allDishes.data || [])
      } else if (viewMode === 'healthy') {
        setData(healthyDishes.data || [])
      } else {
        setData(unhealthyDishes.data || [])
      }
    }
  }, [
    viewMode,
    allDishes.data,
    healthyDishes.data,
    unhealthyDishes.data,
    searchActive,
    searchResults,
  ])

  useEffect(() => {
    setSearchTerm('')
    setSearchActive(false)
  }, [viewMode])

  function handleDelete(dishToDelete: Dish) {
    setData(prev => prev.filter(dish => dish.id !== dishToDelete.id))
  }

  function handleEdit(updatedDish: Dish) {
    setData(prev => prev.map(dish => (dish.id === updatedDish.id ? updatedDish : dish)))
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

  const handleSearch = () => {
    if (searchTerm.trim()) {
      search(searchTerm, viewMode)
      setSearchActive(true)
    } else {
      setSearchActive(false)
      if (viewMode === 'all') {
        setData(allDishes.data || [])
      } else if (viewMode === 'healthy') {
        setData(healthyDishes.data || [])
      } else {
        setData(unhealthyDishes.data || [])
      }
    }
  }

  const columns = getColumns(handleDelete, handleEdit)

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <DishFilterButton
            filters={filters}
            onChangeFilter={handleFilterChange}
            onApplyFilter={applyFilteredDishes}
          />

          <SearchBox
            value={searchTerm}
            onChange={setSearchTerm}
            onSearch={handleSearch}
            disabled={searchLoading}
            placeholder="Buscar prato por nome ou descrição"
          />

          <DishViewMode viewMode={viewMode} onChange={setViewMode} />
        </div>

        <div className="flex justify-end">
          <DishCreateButton onCreate={handleCreate} />
        </div>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}
