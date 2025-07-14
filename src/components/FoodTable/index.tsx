import { DataTable } from '../DataTable'
import { useEffect, useState } from 'react'
import { getColumns } from './columns'
import { Food } from '@/shared/types/food'
import { useFoods } from '@/shared/hooks/foods/useFoods'
import FoodCreateButton from './FoodCreateButton'
import { useFoodSearch } from '@/shared/hooks/foods/useFoodSearch'
import SearchBox from '../SearchBox'
import FoodReport from '../FoodReport/FoodReport'

export default function FoodTable() {
  const foodData = useFoods()
  const [data, setData] = useState(foodData.data || [])
  const [searchTerm, setSearchTerm] = useState('');
  const [searchActive, setSearchActive] = useState(false);

  const { search, results: searchResults, loading: searchLoading } = useFoodSearch();

  useEffect(() => {
    if(!searchActive) {
        setData(foodData.data || [])
    }
  }, [foodData.data, searchActive])

  useEffect(() => {
    if (searchActive) {
      setData(searchResults);
    }
  }, [searchResults, searchActive]);

  function handleDelete(foodToDelete: Food) {
    setData(prev => prev.filter(food => food.id !== foodToDelete.id))
  }

  function handleEdit(updatedFood: Food) {
    setData(prev => prev.map(f => (f.id === updatedFood.id ? updatedFood : f)))
  }
  function handleCreate(newFood: Food) {
    setData(prev => [...prev, newFood])
  }

  const handleSearch = () => {
    if (searchTerm.trim()) {
      search(searchTerm);
      setSearchActive(true);
    } else {
      setSearchActive(false);
      setData(foodData.data || []);
    }
  };

  const columns = getColumns(handleDelete, handleEdit)

  if (foodData.error) return <p className="text-red-500">Erro: {foodData.error}</p>;
  if (foodData.isLoading) return <p className="text-gray-500">Carregando comidas...</p>;

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <SearchBox
            value={searchTerm}
            onChange={setSearchTerm}
            onSearch={handleSearch}
            disabled={searchLoading}
            placeholder="Buscar comida por nome"
          />
        </div>
      <div className="flex justify-end">
        <FoodCreateButton onCreate={handleCreate} />
        <FoodReport />
      </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
